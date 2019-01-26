"""Base64 plugin for Babbage.

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


class Base64Encode(object):

  def __init__(self):
    self.name = 'Base 64 encode'
    self.description = 'Returns a base 64 encoded string.'
    self.options = []

  def Process(self, incoming_data, unused_options):
    """Simple base64 encoding.

    Args:
      incoming_data: String of data to process.
      unused_options: Not used.

    Returns:
      Base64 encoded string.
    """
    return base64.b64encode(incoming_data)


class Base64Decode(object):

  def __init__(self):
    self.name = 'Base 64 decode'
    self.description = 'Returns a base 64 decoded string.'
    self.options = []

  def Process(self, incoming_data, unused_options):
    """Simple base64 decode, accepting strings with omitted padding.

    Args:
      incoming_data: String of data to process, with or without padding.
      unused_options: Not used.

    Returns:
      Base64 decoded string.
    """
    missing_padding = 4 - len(incoming_data) % 4
    return base64.b64decode(incoming_data + '=' * missing_padding)
