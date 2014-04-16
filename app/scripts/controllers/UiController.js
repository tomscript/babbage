/**
 * @license
 * Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview UI Controller.
 * @author tomfitzgerald@google.com (Tom Fitzgerald)
 */
'use strict';


goog.provide('babbage.controllers.UiCtrl');

goog.require('goog.Uri.QueryData');
goog.require('goog.crypt.base64');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.fs.FileReader');
goog.require('goog.fs.FileReader.EventType');



/**
 * UiController
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angular.Scope} $rootScope Angular root scope.
 * @param {!angular.$location} $location Angular location object.
 * @param {!babbage.services.PluginsService} PluginsService
 * @ngInject
 * @constructor
 */
babbage.controllers.UiCtrl = function(
    $scope,
    $rootScope,
    $location,
    PluginsService) {
  $rootScope['inputFile'] = false;

  /** @private */
  this.scope_ = $scope;

  /** @private */
  this.rootScope_ = $rootScope;

  /** @private */
  this.pluginsService_ = PluginsService;

  /** @private */
  this.outputTextEl_ = goog.dom.getElement(
      babbage.controllers.UiCtrl.IDS_['OUTPUT']);

  /** @private */
  this.fileUploadInputEl_ = goog.dom.getElement(
      babbage.controllers.UiCtrl.IDS_['FILE_UPLOAD_INPUT']);

  /** @private */
  this.handler_ = new goog.events.EventHandler(this);

  this.rootScope_.selectedPlugins = [];

  this.rootScope_.selectedPluginsEl = [];

  goog.exportProperty($rootScope, 'selectedPlugins',
      $rootScope.selectedPlugins);

  goog.exportProperty($rootScope, 'selectedPluginsEl',
      $rootScope.selectedPluginsEl);

  goog.exportProperty($scope, 'ids', babbage.controllers.UiCtrl.IDS_);

  // goog.exportProperty($scope, 'listPlugins',
  //     goog.bind(this.listPlugins, this));

  goog.exportProperty($scope, 'removePlugin',
      goog.bind(this.removePlugin, this));

  goog.exportProperty($scope, 'helpButtonClicked',
      goog.bind(this.helpButtonClicked, this));

  goog.exportProperty($scope, 'selectPlugin',
      goog.bind(this.selectPlugin, this));

  goog.exportProperty($scope, 'clearButtonClicked',
      goog.bind(this.clearButtonClicked, this));

  goog.exportProperty($scope, 'submitButtonClicked',
      goog.bind(this.submitButtonClicked, this));

  goog.exportProperty($scope, 'createUploadListener',
      goog.bind(this.createUploadListener, this));

  goog.exportProperty($scope, 'downloadFile',
      goog.bind(this.downloadFile, this));
};


/**
 * Element ID's.
 * @private
 * @const
 */
babbage.controllers.UiCtrl.IDS_ = {
  'SELECTED_PLUGINS': 'selected-plugin-list',
  'FILE_UPLOAD_INPUT': 'fileUploadInput',
  'INPUT': 'input',
  'OUTPUT': 'output'
};


/**
 * Strings used in UI.
 * @const
 * @private
 */
babbage.controllers.UiCtrl.STRINGS_ = {
  'ERROR_DECODING': 'Oops, something broked. :\'(',
  'NO_PLUGINS_SELECTED': 'No plugins selected.',
  'NO_INPUT': 'No input.'
};


/**
 * URI's.
 * @const
 * @private
 */
babbage.controllers.UiCtrl.URIs_ = {
  'MAIN_PAGE': '/',
  'HELP_PAGE': '/help',
  'ABOUT_PAGE': '/about'
};


babbage.controllers.UiCtrl.HELP_MESSAGE = '- Paste in text in the input ' +
    'text field.\n-Select a plugin on the left by clicking its name. ' +
    'Some plugins have options, hover over a plugin for more details on how ' +
    'they work. Chain together plugins for powerful results.\n-Hit Run ' +
    'to decode your text.';


/**
 * Retrieves lists of available plugins.
 * @export
 */
babbage.controllers.UiCtrl.prototype.listPlugins = function() {
  this.pluginsService_.listPlugins().then(goog.bind(function(response) {
    this.scope_.plugins = response;
  }, this));
};


/**
 * Adds plugin to selected list.
 * @param {!Element} plugin The plugin that was clicked.
 */
babbage.controllers.UiCtrl.prototype.selectPlugin = function(plugin) {
  this.rootScope_['selectedPlugins'].push(plugin);
};


/**
 * Removes plugin from selected list.
 * @param {!goog.events.EventTarget} event Response from click event.
 * @param {!Element} plugin The plugin that was clicked.
 */
babbage.controllers.UiCtrl.prototype.removePlugin = function(event, plugin) {
  if (event.target.tagName != goog.dom.TagName.LI &&
      event.target.getAttribute('type') != 'checkbox') {
    return;
  }
  this.rootScope_['selectedPlugins'].splice(
      this.rootScope_['selectedPlugins'].indexOf(plugin), 1);
};


/**
 * Displays help page.
 */
babbage.controllers.UiCtrl.prototype.helpButtonClicked = function() {
  alert(babbage.controllers.UiCtrl.HELP_MESSAGE);
};


/**
 * Clears input, ouput and plugins.
 */
babbage.controllers.UiCtrl.prototype.clearButtonClicked = function() {
  this.scope_['inputTextArea'] = '';
  this.scope_['outputTextArea'] = '';
  this.fileUploadInputEl_.value = '';
};


/**
 * Sends data to App Engine and handles response.
 */
babbage.controllers.UiCtrl.prototype.submitButtonClicked = function() {
  var plugins = goog.dom.getElement(
      babbage.controllers.UiCtrl.IDS_['SELECTED_PLUGINS']);
  var selectedPlugins = this.pluginsElToObj_(plugins);

  // Are we reading a file or the textarea?
  var inputValue = this.scope_['inputFile'] ? this.scope_['inputFile'] :
      goog.crypt.base64.encodeString(this.scope_['inputTextArea']);

  var postData = {
    'input': inputValue,
    'plugins': selectedPlugins
  };
  this.pluginsService_.convertInput(postData).then(goog.bind(function(output) {
    if (!output.hasOwnProperty('success')) {
      alert(output['failure']);
      return;
    }
    // Save Base64 version in case we want to download.
    this.rootScope_['outputBase64'] = output.success;
    this.scope_['outputTextArea'] = goog.crypt.base64.decodeString(
        output.success);

    // Hacky highlight.
    setTimeout(goog.bind(function() {
      this.outputTextEl_.select();
    }, this), 100);
  }, this));
};


/**
 * Converts selected plugins from DOM elements into an object.
 * @param {!Array.<Element>} pluginEls Elements of selected plugins.
 * @return {Object.<string, string>} Plugins in an object.
 * @private
 */
babbage.controllers.UiCtrl.prototype.pluginsElToObj_ = function(pluginEls) {
  var plugins = [];
  for (var i = 0, plugin; plugin = pluginEls.children[i]; i++) {
    var options = [];
    if (plugin.children) {
      for (var j = 0, pluginOpts; pluginOpts = plugin.children[j]; j++) {
        if (pluginOpts.getAttribute('type') != 'text') {
          continue;
        }
        options.push(encodeURIComponent(pluginOpts.value));
      }
    }
    plugins.push({
      'name': plugin.getAttribute('data-plugin-name'),
      'options': options
    });
  }
  return plugins;
};


/**
 * Creates listeners on file input element.
 */
babbage.controllers.UiCtrl.prototype.createUploadListener = function() {
  var fileUploadEl_ = goog.dom.getElement(
      babbage.controllers.UiCtrl.IDS_['FILE_UPLOAD_INPUT']);
  this.handler_.listen(
      fileUploadEl_,
      goog.events.EventType.CHANGE,
      this.fileUploadChanged_);
};


/**
 * Reads response from file upload input.
 * @private
 * @param {!goog.events.Event} evt Event response.
 */
babbage.controllers.UiCtrl.prototype.fileUploadChanged_ = function(evt) {
  if (!this.fileUploadInputEl_.files.length) {
    return;
  }
  var fileReader = new FileReader();
  this.handler_.listen(
      fileReader,
      goog.fs.FileReader.EventType.LOAD_END,
      this.fileUploadCompleted_);
  fileReader.readAsBinaryString(goog.dom.getElement(
      babbage.controllers.UiCtrl.IDS_['FILE_UPLOAD_INPUT'])
      .files[0]);
};


/**
 * Uses the uploaded file as input.
 * @param {!goog.events.Event} evt Event response.
 * @private
 */
babbage.controllers.UiCtrl.prototype.fileUploadCompleted_ = function(evt) {
  this.scope_['inputFile'] = goog.crypt.base64.encodeString(evt.target.result);
  this.scope_.$digest();
};


/**
 * Downloads output as a file.
 */
babbage.controllers.UiCtrl.prototype.downloadFile = function() {
  window.open('data:application/octet-stream;base64,' +
      this.rootScope_['outputBase64'], 'blank');
};
