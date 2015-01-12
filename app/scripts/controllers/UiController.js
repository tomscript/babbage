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

goog.require('goog.crypt.base64');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.fs.FileReader');
goog.require('goog.fs.FileReader.EventType');



/**
 * UiController
 * @param {!angular.Scope} $rootScope Angular scope.
 * @param {!angular.Scope} $scope Angular scope.
 * @param {!angular.$document} $document Angular document object.
 * @param {!babbage.services.PluginsService} PluginsService
 * @ngInject
 * @constructor
 */
babbage.controllers.UiCtrl = function($rootScope, $scope, $document, 
    PluginsService) {
  /** @private */
  this.document_ = $document;
  /** @private */
  this.rootScope_ = $rootScope;
  /** @private */
  this.scope_ = $scope;
  /** @private */
  this.pluginsService_ = PluginsService;
  /** @private */
  this.handler_ = new goog.events.EventHandler(this);

  /** @type {Array.<Object>} */
  this.scope_['selectedPlugins'] = [];
  /** @type {Array.<Object>} */
  this.scope_['plugins'] = [];

  goog.exportProperty($scope, 'clearButtonClicked',
      goog.bind(this.clearButtonClicked, this));

  goog.exportProperty($scope, 'submitButtonClicked',
      goog.bind(this.submitButtonClicked, this));

  goog.exportProperty($scope, 'downloadFile',
      goog.bind(this.downloadFile, this));

  goog.exportProperty($scope, 'init',
      goog.bind(this.init, this));
};


/**
 * Sets up listeners and lists plugins.
 * @export
 */
babbage.controllers.UiCtrl.prototype.init = function() {
  this.listPlugins();
  this.outputTextEl_ = goog.dom.getElementByClass('output-textarea');
  this.fileUploadInputEl_ = goog.dom.getElementByClass('file-upload-input');
  this.createUploadListener();
};


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
 * Clears input, ouput and plugins.
 */
babbage.controllers.UiCtrl.prototype.clearButtonClicked = function() {
  this.scope_['inputText'] = '';
  this.scope_['outputTextArea'] = '';
  this.fileUploadInputEl_.value = '';
  this.scope_['inputFile'] = false;
  this.scope_['showFileUpload'] = false;
};


/**
 * Sends data to App Engine and handles response.
 */
babbage.controllers.UiCtrl.prototype.submitButtonClicked = function() {
  var inputValue = this.scope_['inputFile'] ? this.scope_['inputFile'] :
      this.scope_['inputText'];

  var postData = {
    'input': inputValue,
    'plugins': this.scope_['selectedPlugins']
  };

  this.pluginsService_.convertInput(postData).then(goog.bind(function(output) {
    if (!output.hasOwnProperty('success')) {
      alert(output['failure']);
      return;
    }
    // Save Base64 version in case we want to download.
    this.rootScope_['outputBase64'] = goog.crypt.base64.encodeString(
        output.success);

    this.scope_['outputTextArea'] = output.success;

    // Hacky highlight.
    setTimeout(goog.bind(function() {
      this.outputTextEl_.select();
    }, this), 100);
  }, this));
};


/**
 * Creates listeners on file input element.
 */
babbage.controllers.UiCtrl.prototype.createUploadListener = function() {
  /* ngChange doesn't work on file inputs so I have to do this myself. :"( */
  var fileUploadEl_ = goog.dom.getElementByClass('file-upload-input');
  this.handler_.listen(fileUploadEl_, goog.events.EventType.CHANGE,
      this.fileUploadChanged_);
};


/**
 * Reads response from file upload input.
 * @param {!goog.events.Event} evt Event response.
 * @private
 */
babbage.controllers.UiCtrl.prototype.fileUploadChanged_ = function(evt) {
  if (!this.fileUploadInputEl_.files.length) return;
  var fileReader = new FileReader();
  this.handler_.listen(fileReader, goog.fs.FileReader.EventType.LOAD_END,
      goog.bind(function(e) {
        this.scope_['inputFile'] = goog.crypt.base64.encodeString(
            e.target.result);
        this.scope_.$digest();
      }, this));
  fileReader.readAsBinaryString(goog.dom.getElementByClass(
      'file-upload-input').files[0]);
};


/**
 * Downloads output as a file.
 */
babbage.controllers.UiCtrl.prototype.downloadFile = function() {
  window.open('data:application/octet-stream;base64,' +
      this.scope_['outputBase64'], 'blank');
};
