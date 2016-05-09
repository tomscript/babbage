"""Babbage - Framework for decoding data.

Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

__author__ = 'tomfitzgerald@google.com (Tom Fitzgerald)'

import base64
import json
import urllib

import webapp2

import plugin_handler


def Process(input_text, plugins):
  """Runs input text through each selected plugin.

  Args:
    input_text: Text to be processed.
    plugins: Dict of plugins to process: {'name': 'Base 64 Encode'}

  Returns:
    Dict of decoded data containing a success or failure.
  """  
  try:                    
    response = plugin_handler.ProcessPlugins(input_text.encode('utf-8'), plugins)    
  except plugin_handler.Error as e:    
    return json.dumps({'failure': str(e)})
  return json.dumps({'success': response}, ensure_ascii=False)
  

class MainPoster(webapp2.RequestHandler):
  """Data was posted so we must be converting data. Pass to plugins."""

  def post(self):
    response = json.loads(self.request.body)
    if response.get('input') is None:
      return            
    self.response.out.write(Process(response['input'], response['plugins']))


class ListPlugins(webapp2.RequestHandler):
  """List plugins via JSON to frontend."""

  def get(self):
    """Responds to GET requests."""
    self.response.out.write(json.dumps(plugin_handler.ListPlugins()))


app = webapp2.WSGIApplication([
    ('/convert', MainPoster),
    ('/listplugins', ListPlugins)
    ], debug=False)
