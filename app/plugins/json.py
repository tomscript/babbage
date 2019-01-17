__author__ = 'ttomsu@google.com (Travis Tomsu)'

import simplejson as json
import logging

class JsonPrettyPrint(object):

  def __init__(self):
    self.name = 'JSON Pretty Print'
    self.description = 'Pretty Prints a JSON object'
    self.options = []

  def Process(self, incoming_data, unused_options):
    """Pretty prints the income_data as a JSON object.

    Args:
      incoming_data: String of data to process.
      unused_options: Not used.

    Returns:
      Pretty printed JSON.
    """
    return json.dumps(json.loads(incoming_data), indent=2, sort_keys=True)
