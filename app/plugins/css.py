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

import re

VENDOR_PREFIX = ('webkit',)

class CSS(object):

  def __init__(self):
    self.name = 'Friendly CSS'
    self.description = ('Makes CSS happy.')
    self.options = []

  def _ToCamelCase(self, string):
    """Converts text to camel case (on hyphen)."""
    location = string.find('-')
    out = string.replace('-', '')
    return out[0:location] + out[location].upper() + out[location+1:len(string)]

  def _FromCamelCase(self, line):
    """Restores original text from camel case."""
    result = re.search('([A-Z]+).*\:', line)
    if not result:
      return line
    cap = result.groups()[0]
    cap_idx = line.find(cap)
    result = (line[0:cap_idx] + '-' + line[cap_idx].lower() +
      line[cap_idx+1:len(line)])

  def _FormatInput(self, attr):
    """Reads an attribute."""
    # Temporarily removes vendor prefixes.
    for prefix in VENDOR_PREFIX:
      if prefix in attr:
        attr = re.sub('-' + prefix + '-', '', attr) + prefix
        continue
    # Temporarily removes hyphens from attribute key.
    attr_key = attr.split(':')[0]
    if attr_key.find('-') > 0:
      attr = self._ToCamelCase(attr_key)
    return re.sub('^\x20*', '', attr)

  def _FormatAttr(self, line):
    """Formats attribute before being returned."""
    result = self._FromCamelCase(line)
    for prefix in VENDOR_PREFIX:
      if line.endswith(prefix):
        line = '-' + prefix + '-' + line.replace(prefix, '')
        continue
    return '  ' + line + '\n'

  def Read(self, incoming_data):
    """Each input line is read and added into a dict for sorting.

    Loops over each line and puts each element into a dict. Each attribute of
    the element is then added to the element dict into a list.
    """
    in_element = False
    result = {}
    for line in incoming_data.split('\n'):
      if not in_element:
        re_match = re.search('.*((\.|#).*)\x20*{$', line)
        if not re_match:
          continue
        element = re_match.groups()[0]
        result[element] = []
        in_element = True
        continue
      if line.find('}') >= 0:
        result[element] = sorted(result[element])
        in_element = False
        continue
      if not len(line):
        continue
      result[element].append(self._FormatInput(line))
    return result

  def Process(self, incoming_data, _):
    """Returns friendlier looking CSS."""
    out = []
    results = self.Read(incoming_data)
    for element in sorted(results.keys()):
      out.append(element + '{\n')
      for attr in results[element]:
        out.append(self._FormatAttr(attr))
      out.append('}\n\n')
    return ''.join(out)
