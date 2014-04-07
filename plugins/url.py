"""Url encode/decode plugin for Babbage.

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

import urllib


class UrlEncode(object):

  def __init__(self):
    self.name = 'Url encode'
    self.description = ('Returns a url encoded string. Ex: \'tom is cool\''
                        '\'tom%20is%20cool\'.')
    self.options = 0

  def Process(self, incoming_data, _):
    """Simple url encoding.

    Args:
      incoming_data: String of data to process.

    Returns:
      Url encoded string.
    """
    return urllib.quote(incoming_data)


class UrlDecode(object):

  def __init__(self):
    self.name = 'Url decode'
    self.description = ('Returns a url decoded string. Ex: \'tom%is%cool\''
                        '\'tom is cool\'.')
    self.options = 0

  def Process(self, incoming_data, _):
    """Simple url decoding.

    Args:
      incoming_data: String of data to process.

    Returns:
      Url decoded string.
    """
    return urllib.unquote(incoming_data)
