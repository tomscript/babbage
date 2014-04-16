"""ROT13 plugin for Babbage.

Copyright 2014 Joscha Feth All rights reserved.

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

__author__ = 'joscha@feth.com (Joscha Feth)'

import codecs


class Rot13Encode(object):

  def __init__(self):
    self.name = 'ROT-13 encode'
    self.description = 'Returns a ROT-13 encoded string.'
    self.options = []

  def Process(self, incoming_data, unused_options):
    """Simple ROT-13 encoding.

    Args:
      incoming_data: String of data to process.
      unused_options: Not used.

    Returns:
      ROT-13 encoded string.
    """
    return codecs.decode(incoming_data, 'rot_13')


class Rot13Decode(object):

  def __init__(self):
    self.name = 'ROT-13 decode'
    self.description = 'Returns a ROT-13 decoded string.'
    self.options = []

  def Process(self, incoming_data, unused_options):
    """Simple ROT-13 decode.

    Args:
      incoming_data: String of data to process.
      unused_options: Not used.

    Returns:
      ROT-13 decoded string.
    """
    return codecs.decode(incoming_data, 'rot_13')
