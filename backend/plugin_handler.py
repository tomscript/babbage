"""List plugins and processes data.

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

import logging

from plugins import base_64
from plugins import fromcharcode
from plugins import hex2ascii
from plugins import punycode
from plugins import replace
from plugins import rot13
from plugins import strrev
from plugins import url
from plugins import xor
from plugins import punycode

AVAILABLE_PLUGINS = (
  base_64.Base64Decode(),
  base_64.Base64Encode(),
  base_64.UrlSafeBase64Decode(),
  base_64.UrlSafeBase64Encode(),
  hex2ascii.Hex2Ascii(),
  url.UrlEncode(),
  url.UrlDecode(),
  fromcharcode.FromCharCode(),
  punycode.PunycodeEncode(),
  punycode.PunycodeDecode(),
  replace.Replace(),
  rot13.Rot13Decode(),
  rot13.Rot13Encode(),
  strrev.StrRev(),
  xor.Xor(),
  xor.IncrementalXor()
)


class Error(Exception):
  """Base exception class for plugin errors."""


def ListPlugins():
  """List plugins via dict to frontend.

  Returns:
    A list of dictionaries containing the plugin 'name', 'options', and
    'description'.
  """
  available_plugins = []
  for current_plugin in AVAILABLE_PLUGINS:
    available_plugins.append({
        'name': current_plugin.name,
        'optionsDesc': current_plugin.options,
        'options': ['' for x in xrange(len(current_plugin.options))],
        'description': current_plugin.description})
  return available_plugins


def ProcessPlugins(data, plugins):
  """Passes data to plugins, sends back response.

  Args:
    data: Text to be processed.
    plugins: List of dicts with plugins to process: [{'name': 'Base 64 Encode'}]

  Returns:
    Dict of decoded data containing a success or failure.
  """
  for plugin in plugins:
    for current_plugin in AVAILABLE_PLUGINS:
      if plugin['name'] == current_plugin.name:
        try:
          data = current_plugin.Process(data, plugin['options'])
        except Exception as e:
          logging.error('ProcessPlugins exception: %s' % str(e))
          raise Error(e)
  return data
