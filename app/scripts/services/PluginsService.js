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
 * @fileoverview Service to list plugins and send data to App Engine.
 * @author tomfitzgerald@google.com (Tom Fitzgerald)
 */
'use strict';


goog.provide('babbage.services.PluginsService');


babbage.services.PluginsService = ['$http', function($http) {
  return {
    selectedPlugins: [],
    /**
     * Lists plugins.
     * @return {!Array.<Object>} Plugins from App Engine.
     */
    listPlugins: function() {
      return $http.get('/listplugins').then(function(result) {
        return result.data;
      });
    },
    /**
     * @return {!Promise}
     */
    convertInput: function(postData) {
      return $http.post('/convert', postData).then(function(result) {
        return result.data;
      });
    }
  };
}];
