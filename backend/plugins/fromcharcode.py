"""Detects all strings likely to contain fromCharCode data and decodes them.

For example:
  116,111,109,109,121 will be decoded to 'tommy'.

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

import re


class FromCharCode(object):

  def __init__(self):
    self.name = 'fromCharCode'
    self.description = ('Takes decimal and returns the ASCII letters '
                        'equivalent.')
    self.options = []

  def Process(self, incoming_data, unused_options):
    """Returns the results up JavaScripts fromCharCode method.

    Args:
      incoming_data: String of data to process.
      unused_options: Not used.

    Returns:
      fromCharCode string.
    """
    resp = []
    for b in re.finditer(r'[0-9]+(?:\,[0-9]{2,3})*', incoming_data):
      resp.append(''.join(map(unichr, map(int, b.group(0).split(',')))))
    return '\n'.join(resp)
