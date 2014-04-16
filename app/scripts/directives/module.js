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
 * @fileoverview Entry point for Babbage app.
 * @author tomfitzgerald@google.com (Tom Fitzgerald)
 */
'use strict';


goog.provide('babbage.Directives');

goog.require('babbage.directives.AvailablePlugins');
goog.require('babbage.directives.FileUpload');
goog.require('babbage.directives.OutputOptions');
goog.require('babbage.directives.SelectedPlugins');


babbage.Directives.MODULE_NAME = 'babbage.directives';

babbage.Directives.module_ = angular.module(babbage.Directives.MODULE_NAME, []);

babbage.Directives.module_.directive(
    'available',
    babbage.directives.AvailablePlugins);

babbage.Directives.module_.directive(
    'fileupload',
    babbage.directives.FileUpload);

babbage.Directives.module_.directive(
    'selected',
    babbage.directives.SelectedPlugins);

babbage.Directives.module_.directive(
    'outputoptions',
    babbage.directives.OutputOptions);
