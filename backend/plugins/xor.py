"""Xor plugin for Babbage.

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

import binascii


class Xor(object):

  def __init__(self):
    self.name = 'Xor'
    self.description = ('Expecting an two letter hex value to XOR, for example:'
                        ' BA or FE.')
    self.options = ['XOR byte Ex: BA or FE']

  def Process(self, incoming_data, options):
    """Simple XOR.

    Args:
      incoming_data: String of data to process.
      options:  String representation in hexadecimal of a byte.

    Returns:
      String after XOR has been completed.
    """
    key = ord(binascii.unhexlify(options[0]))
    return ''.join(chr(ord(i) ^ key) for i in incoming_data)


class IncrementalXor(object):

  def __init__(self):
    self.name = 'Incremental Xor'
    self.description = ('Does a incremental XOR with provided key. For '
                        'example: BE or FF')
    self.options = ['XOR byte Ex: BA or FE']

  def Process(self, incoming_data, options):
    """Incremental XOR.

    Args:
      incoming_data: String representation in hexadecimal of a byte.
      options: One byte XOR key.

    Returns:
      String after XOR has been completed.
    """
    output_data = ''
    key = ord(binascii.unhexlify(options[0]))
    for i in incoming_data:
      output_data += chr(ord(i) ^ key)
      key = (key + 1) % 256
    return output_data
