"""Replace for Babbage.

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


class Replace(object):

  def __init__(self):
    self.name = 'Replace'
    self.description = ('Simple replace, "o", "i", "tommy" == "timmy"')
    # Number of input options to display for this plugin.
    self.options = 2

  def Process(self, incoming_data, options):
    """Simple search and replace.

    Args:
      incoming_data: String of data to process.
      options: List of options, what to replace with and what to search for.

    Returns:
      String after search and replace has been completed.
    """
    search_for, replace_with = (urllib.unquote(options[0]),
                                urllib.unquote(options[1]))
    return incoming_data.replace(search_for, replace_with)
