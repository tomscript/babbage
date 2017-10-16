# -*- coding: utf-8 -*-
"""Punycode plugin for Babbage.

Copyright 2017 Google Inc. All rights reserved.

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

__author__ = 'fryy@google.com (Simon Freiberg)'

import codecs


class PunycodeEncode(object):

  def __init__(self):
    self.name = 'Punycode encode'
    self.description = 'Returns a punycode encoded string.'
    self.options = []

  def Process(self, incoming_data, unused_options):
    """Simple punycode encoding.

    Args:
      incoming_data: String of data to process.
      unused_options: Not used.

    Returns:
      Punycode encoded string.
    """
    return codecs.encode(incoming_data.decode('utf-8'), 'idna')


class PunycodeDecode(object):

  def __init__(self):
    self.name = 'Punycode decode'
    self.description = 'Returns a punycode decoded string.'
    self.options = []

  def Process(self, incoming_data, unused_options):
    """Simple punycode decode, removing any leading 'xn--'

    Args:
      incoming_data: String of data to process
      unused_options: Not used.

    Returns:
      Punycode decoded string.
    """
    #if incoming_data.startswith('xn--'):
    #  incoming_data = incoming_data[4:]
    return codecs.decode(incoming_data, 'idna')
