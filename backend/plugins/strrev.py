"""String reverse plugin for Babbage."""

__author__ = 'niu@google.com (Yuan Niu)'


class StrRev(object):

  def __init__(self):
    self.name = 'String reverse'
    self.description = ('Returns a reversed string. Ex: '
                        '\'J3byJXZ"(edoced_46esab(lave"\''
                        '\'eval(base64_decode("ZXJyb3J\'')
    self.options = []

  def Process(self, incoming_data, _):
    """Simple string reverse.

    Args:
      incoming_data: String of data to process.
      unused_options: Not used.

    Returns:
      String with chars in reverse order.
    """
    return ''.join(reversed(incoming_data))
    