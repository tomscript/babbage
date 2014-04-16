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
 * @fileoverview Groups controllers into a single module.
 * @author tomfitzgerald@google.com (Tom Fitzgerald)
 */
'use strict';


goog.provide('babbage.Services');

goog.require('babbage.services.PluginsService');


/** @const */
babbage.Services.MODULE_NAME = 'bababge.models';


/** @private */
babbage.Services.module_ = angular.module(babbage.Services.MODULE_NAME, []);


/**
 * Ui Controller
 */
babbage.Services.module_.factory('PluginsService',
    babbage.services.PluginsService);
