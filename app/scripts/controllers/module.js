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


goog.provide('babbage.Controllers');

goog.require('babbage.controllers.UiCtrl');


/** @const */
babbage.Controllers.MODULE_NAME = 'bababge.controllers';


/** @private */
babbage.Controllers.module_ = angular.module(
    babbage.Controllers.MODULE_NAME, []);


/**
 * Ui Controller
 */
babbage.Controllers.module_.controller(
    'babbage.controllers.UiCtrl', babbage.controllers.UiCtrl);
