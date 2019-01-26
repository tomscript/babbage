"""Converts hex to ascii.

Non-printable characters are converted to escape codes of the form \xDD.
Non-hexadecimal characters will be thrown out during processing. New lines
will be preserved.

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

friendly_name = 'Hex2Ascii'
description = 'Return the hex converted to ascii.'

PRINTABLE_CHARS = ('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVW'
                   'XYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ')
HEXADECIMAL_CHARS = '0123456789abcdefABCDEF'
NEWLINE_CHARS = '\r\n'


def GetHex(it):
  x1 = None
  for x in it:
    if x in NEWLINE_CHARS:
      yield x
    if x not in HEXADECIMAL_CHARS:
      continue
    if x1 is None:
      x1 = x
    else:
      yield x1 + x
      x1 = None


class Hex2Ascii(object):

  def __init__(self):
    self.name = 'Hex2Ascii'
    self.description = 'Displays ascii from hexdecimal.'
    self.options = []

  def Process(self, incoming_data, _):
    """Displays ascii from hexdecimal.

    Args:
      incoming_data: String of data to process.

    Returns:
      Ascii string.
    """
    out_l = []
    for xs in GetHex(incoming_data):
      if xs in NEWLINE_CHARS:
        out_l.append('\n')
        continue
      i = int(xs, 16)
      ch = chr(i)
      if ch in PRINTABLE_CHARS:
        out_l.append(ch)
      else:
        out_l.append('\\x{0:02x}'.format(i))
    return ''.join(out_l)
