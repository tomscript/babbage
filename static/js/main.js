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
 * @fileoverview Logic for Babbage.
 * @author tomfitzgerald@google.com (Tom Fitzgerald)
 */

goog.provide('com.tomscript.babbage');

goog.require('goog.Uri.QueryData');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.json');
goog.require('goog.net.XhrIo');
goog.require('goog.style');
goog.require('goog.ui.Dialog');



/**
 * Class defining Babbage application.
 * @constructor
 */
com.tomscript.babbage = function() {
  /**
   * @private {!Element}
   */
  this.availablePluginsEl_ = goog.dom.getElement(
      com.tomscript.babbage.Id_.AVAILABLE_PLUGINS);

  /**
   * @private {!Element}
   */
  this.clearButtonEl_ = goog.dom.getElement(
      com.tomscript.babbage.Id_.CLEAR_BUTTON);

  /**
   * @private {!goog.events.EventHandler}
   */
  this.handler_ = new goog.events.EventHandler(this);

  /**
   * @private {!Element}
   */
  this.helpButtonEl_ = goog.dom.getElement(
      com.tomscript.babbage.Id_.HELP_BUTTON);

  /**
   * @private {!Element}
   */
  this.inputEl_ = goog.dom.getElement(com.tomscript.babbage.Id_.INPUT);

  /**
   * @private {!Element}
   */
  this.outputEl_ = goog.dom.getElement(com.tomscript.babbage.Id_.OUTPUT);

  /**
   * @private {!Element}
   */
  this.selectedPluginsHeaderEl_ = goog.dom.getElement(
      com.tomscript.babbage.Id_.SELECTED_PLUGIN_HEADER);

  /**
   * @private {!Element}
   */
  this.selectedPluginsListEl_ = goog.dom.getElement(
      com.tomscript.babbage.Id_.SELECTED_PLUGIN_LIST);

  /**
   * @private {!Element}
   */
  this.submitButtonEl_ = goog.dom.getElement(
      com.tomscript.babbage.Id_.SUBMIT_BUTTON);
};


/**
 * Element id names.
 * @enum
 * @private
 */
com.tomscript.babbage.Id_ = {
  AVAILABLE_PLUGINS: 'available-plugins',
  CLEAR_BUTTON: 'clear-button',
  HELP_BUTTON: 'help-button',
  INPUT: 'input',
  OUTPUT: 'output',
  SELECTED_PLUGIN_HEADER: 'selected-mod-list-header',
  SELECTED_PLUGIN_LIST: 'selected-plugin-list',
  SUBMIT_BUTTON: 'submit-button'
};


/**
 * Element class names.
 * @enum
 * @private
 */
com.tomscript.babbage.ClassName_ = {
  DIALOG: 'pj-dialog',
  OPTIONS: 'options'
};


/**
 * Element names.
 * @enum
 * @private
 */
com.tomscript.babbage.ElementName_ = {
  OPTIONS: 'options'
};


/**
 * URI's used to connect to App Engine.
 * @enum
 * @private
 */
com.tomscript.babbage.URIs_ = {
  CONVERT: 'convert',
  LIST_PLUGINS: 'listplugins'
};


/**
 * UI messages.
 * @enum
 * @private
 */
com.tomscript.babbage.UiMessages_ = {
  ERROR: 'Error',
  HELP: 'Help',
  LOADING: 'Loading',
  UNABLE_TO_LIST_PLUGINS: 'Unable to list plugins.'
};


/**
 * XSSI prefix.
 * @const
 * @private
 */
com.tomscript.babbage.XSSI_PREFIX_ = ')]}\'';


/**
 * Help message for help pop-up.
 * @const
 * @private
 */
com.tomscript.babbage.HELP_MESSAGE_ = '<ol><li>Paste in text in the input ' +
    'text field.</li><li>Select a plugin on the left by clicking its name. ' +
    'Some plugins have options, hover over a plugin for more details on how ' +
    'they work. Chain together plugins for powerful results.</li><li>Hit Run ' +
    'to decode your text.</li></ol>';


/**
 * Removes all listeners.
 */
com.tomscript.babbage.prototype.dispose = function() {
  this.handler_.dispose();
};


/**
 * Initializes the application. Sets up listeners and retrieves the list of
 *     plugins.
 */
com.tomscript.babbage.prototype.init = function() {
  this.setupUiListeners_();
  goog.net.XhrIo.send(
      com.tomscript.babbage.URIs_.LIST_PLUGINS,
      goog.bind(this.onListPluginsResponse_, this));
};


/**
 * Removes all currently selected plugins.
 * @private
 */
com.tomscript.babbage.prototype.clearAllSelectedPlugins_ = function() {
  this.selectedPluginsListEl_.innerHTML = '';
  goog.style.showElement(this.selectedPluginsHeaderEl_, false);
};


/**
 * Displays error message.
 * @param {string} text Error message.
 * @private
 */
com.tomscript.babbage.prototype.displayError_ = function(text) {
  var errorFragment = document.createDocumentFragment();
  var errorMessage = goog.dom.createDom(goog.dom.TagName.P, {
    'textContent': com.tomscript.babbage.UiMessages_.ERROR + ': ' + text});
  var errorHeading = goog.dom.createDom(goog.dom.TagName.H1, {
    'textContent': com.tomscript.babbage.UiMessages_.ERROR});
  errorFragment.appendChild(errorHeading);
  errorFragment.appendChild(errorMessage);
  this.showPopup_(errorFragment);
};

/**
 * Adds plugin to selected list and creates listener so it can be removed later.
 * @param {!goog.events.BrowserEvent} e Event from click listener containing
 *     plugin.
 * @private
 */
com.tomscript.babbage.prototype.onAvailablePluginClick_ = function(e) {
  var plugin = e.target;
  if (e.target.tagName != goog.dom.TagName.LI) {
    return;
  }
  goog.style.showElement(this.selectedPluginsHeaderEl_, true);
  var selectedPlugin = plugin.cloneNode(true);
  this.selectedPluginsListEl_.appendChild(selectedPlugin);
  // Setup listener so user can remove the plugin.
  this.handler_.listen(
      selectedPlugin,
      goog.events.EventType.CLICK,
      this.removeSelectedPlugin_);
};


/**
 * Clears text fields and removes all selected plugins.
 * @private
 */
com.tomscript.babbage.prototype.onClearButtonClicked_ = function() {
  this.clearAllSelectedPlugins_();
  var allTextAreas = [this.inputEl_, this.outputEl_];
  for (var i = 0, textArea; textArea = allTextAreas[i]; i++) {
    textArea.value = '';
  }
};


/**
 * Handles the response from back end.
 * @param {!goog.events.Event} e Response from back end.
 * @private
 */
com.tomscript.babbage.prototype.onConvertResponse_ = function(e) {
  var resp = e.target.getResponseJson(com.tomscript.babbage.XSSI_PREFIX_);
  if (resp['success']) {
    this.outputEl_.value = resp['success'];
    return;
  }
  this.displayError_(resp['failure']);
  this.outputEl_.value = '';
};


/**
 * Displays help pop-up window.
 * @param {!goog.events.BrowserEvent} e Response from button listener.
 * @private
 */
com.tomscript.babbage.prototype.onHelpButtonClicked_ = function(e) {
  var helpFragment = document.createDocumentFragment();
  var helpMessage = goog.dom.createDom(goog.dom.TagName.P, {
    'innerHTML': com.tomscript.babbage.HELP_MESSAGE_
  });
  var helpHeading = goog.dom.createDom(goog.dom.TagName.H1, {
    'textContent': com.tomscript.babbage.UiMessages_.HELP
  });
  helpFragment.appendChild(helpHeading);
  helpFragment.appendChild(helpMessage);
  this.showPopup_(helpFragment);
};


/**
 * Handles list plugins response, displays in a list and creates listeners.
 * @param {!goog.events.Event} evt Event response containing plugins.
 * @private
 */
com.tomscript.babbage.prototype.onListPluginsResponse_ = function(evt) {
  var optTxt = {};
  var plugins = evt.target.getResponseJson();
  var parent = this.availablePluginsEl_;
  var fragment = document.createDocumentFragment();
  for (var i = 0, currentPlugin; currentPlugin = plugins[i]; i++) {
    var el = goog.dom.createDom(goog.dom.TagName.LI, {
      'textContent': currentPlugin['name'],
      'data-plugin-name': currentPlugin['name'],
      'title': currentPlugin['description']
    });
    if (currentPlugin.hasOwnProperty('options')) {
      var numberOfOptions = parseInt(currentPlugin['options']);
      for (var j = 0; j < numberOfOptions; j++) {
        var opts = goog.dom.createDom(goog.dom.TagName.INPUT, {
          'value': '',
          'name': com.tomscript.babbage.ElementName_.OPTIONS,
          'type': 'text',
          'class': com.tomscript.babbage.ClassName_.OPTIONS
        });
        el.appendChild(opts);
      }
    }
    goog.dom.appendChild(fragment, el);
  }
  goog.dom.appendChild(parent, fragment);
  this.setPluginListeners_();
};


/**
 * Sends selected plugins and input data to back end.
 * @private
 */
com.tomscript.babbage.prototype.onSubmitButtonClick_ = function() {
  var inputTextArea = this.inputEl_.value;
  var selectedPlugins = this.selectedPluginsListEl_;
  if (!inputTextArea && !selectedPlugins.hasChildNodes()) {
    return;
  }
  this.outputEl_.value = com.tomscript.babbage.UiMessages_.LOADING;
  var pluginObj = [];
  for (var i = 0, plugin; plugin = selectedPlugins.children[i]; i++) {
    var options = [];
    if (plugin.hasChildNodes()) {
      for (var j = 0, pluginOpts; pluginOpts = plugin.children[j]; j++) {
        options.push(encodeURIComponent(pluginOpts.value));
      }
    }
    pluginObj.push({
      'name': plugin.getAttribute('data-plugin-name'),
      'options': options});
  }

  var postData = goog.Uri.QueryData.createFromKeysValues(
      ['input', 'plugins'],
      [escape(inputTextArea), escape(JSON.stringify(pluginObj))]);

  goog.net.XhrIo.send(
      com.tomscript.babbage.URIs_.CONVERT,
      goog.bind(this.onConvertResponse_, this),
      'POST',
      postData.toString());
};


/**
 * Removes a selected plugin from the list.
 * @param {!goog.events.BrowserEvent} e Event from click listener containing
 *     plugin.
 * @private
 */
com.tomscript.babbage.prototype.removeSelectedPlugin_ = function(e) {
  if (e.target.tagName != goog.dom.TagName.LI) {
    return;
  }
  var plugin = e.target;
  goog.dom.removeNode(plugin);
  var parent = this.selectedPluginsListEl_;
  if (!parent.hasChildNodes()) {
    goog.style.showElement(this.selectedPluginsHeaderEl_, false);
  }
};


/**
 * Creates listeners for available plugins.
 * @private
 */
com.tomscript.babbage.prototype.setPluginListeners_ = function() {
  this.handler_.listen(
      this.availablePluginsEl_,
      goog.events.EventType.CLICK,
      this.onAvailablePluginClick_);
};


/**
 * Creates listeners for UI buttons.
 * @private
 */
com.tomscript.babbage.prototype.setupUiListeners_ = function() {
  // Submit button.
  this.handler_.listen(
      this.submitButtonEl_,
      goog.events.EventType.CLICK,
      this.onSubmitButtonClick_);
  // Clear button.
  this.handler_.listen(
      this.clearButtonEl_,
      goog.events.EventType.CLICK,
      this.onClearButtonClicked_);
  // Help button.
  this.handler_.listen(
      this.helpButtonEl_,
      goog.events.EventType.CLICK,
      this.onHelpButtonClicked_);
};


/**
 * Create a new popup window.
 * @param {!DocumentFragment} docFragment A DocumentFragment containing the
 *     data that the popup window will contain.
 * @private
 */
com.tomscript.babbage.prototype.showPopup_ = function(docFragment) {
  var dialog = new goog.ui.Dialog(com.tomscript.babbage.ClassName_.DIALOG);
  goog.dom.appendChild(dialog.getContentElement(), docFragment);
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  dialog.setVisible(true);
  dialog.setDisposeOnHide(true);
};


goog.exportSymbol('babbage', com.tomscript.babbage);
goog.exportProperty(com.tomscript.babbage.prototype, 'init',
    com.tomscript.babbage.prototype.init);
goog.exportProperty(com.tomscript.babbage.prototype, 'dispose',
    com.tomscript.babbage.prototype.dispose);
