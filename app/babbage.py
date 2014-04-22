#!/usr/bin/python

"""Command line utility for Babbage.

This will process data either from standard input or from a specified file (-f).
It will process either the entire file or each line of data (-l) through a
provided list of plugins and print the result.

To display the list of plugins, run babbage without any arguments.

babbage [-f <File>] [-l] <plugin> [<option> ...] [<plugin> ...]
 -f: Specifies an input file to process
 -l: Switch from full file processing to line by line processing. This will have
     a dramatic effect on the output of some plugins, for example base_64_encode
     will return an encoding per line as opposed to a single encoding.

Examples:
  ./babbage.py -f in.txt replace 0 3 hex2ascii
  - This will process the entire file in.txt, using the replace plugin to alter
    all zeros to threes and then the hex2ascii plugin to convert hexadecimal
    representation into ascii characters.

  cat in.txt | ./babbage.py -l hex2ascii
  - This will process the output from "cat in.txt", line by line, through the
    hex2ascii plugin.

  ./babbage.py replace A Z
  - This will process standard input changing all A's to Z's.

  ./babbage.py -f replace.txt -l replace A Z
  - This will process each line from a file named replace.txt changing all A's
    to Z's.
"""

import argparse
import sys

import plugin_handler


PLUGIN_LIST = plugin_handler.ListPlugins()


def RetrievePlugin(name):
  """Retrieves all plugins associated with the given name.

  This uses 'name' as a prefix match against the plugin names and returns all
  matching plugins. For example, 'base_64_d' would return ['base_64_decoder']
  whereas 'base_64' would return ['base_64_decoder', 'base_64_encoder'].

  Args:
    name: Name of the plugin to find.

  Returns:
    A list of plugins associated with the name or None.
  """
  name = name.lower().replace('_', ' ')
  potentials = []
  for plugin in PLUGIN_LIST:
    if plugin['name'].lower().startswith(name):
      potentials.append(plugin)
  if not potentials:
    return None
  return potentials


def GetPlugins(args):
  """Creates plugin description dictionaries from the argument list.

  If a given name is not a plugin yet should be at that position in the argument
  list, this will print an error and exit(1) the script.

  If a given plugin name matches ambigiously with multiple plugins, this will
  print an error and exit(1) the script.

  Args:
    args: The command line argument list to scan.

  Yields:
    Plugin description dictionaries of the form:
      { 'name': plugin_name, 'options': option_count }
  """
  plugin = None
  option_count = 0
  options = []
  for s in args:
    if option_count <= 0:
      if plugin:
        yield {'name': plugin['name'], 'options': options}
        options = []
      plugins = RetrievePlugin(s)
      if not plugins:
        print >> sys.stderr, 'Plugin not found:', s
        print >> sys.stderr, ''
        DisplayPluginList()
        sys.exit(1)
      if len(plugins) > 1:
        print >> sys.stderr, 'Ambigious plugin name found:', s
        print >> sys.stderr, 'Possible matches: ' + ', '.join(
            plugin['name'].replace(' ', '_') for plugin in plugins)
        print >> sys.stderr, ''
        DisplayPluginList()
        sys.exit(1)
      plugin = plugins[0]
      option_count = len(plugin['options'])
    else:
      options.append(s)
      option_count -= 1
  if plugin:
    yield {'name': plugin['name'], 'options': options}


def DisplayPluginList():
  print >> sys.stderr, 'The available plugins include:'
  for plugin in PLUGIN_LIST:
    plugin_name = plugin['name'].replace(' ', '_')
    print >> sys.stderr, ' ' + plugin_name
    print >> sys.stderr, '   - ' + plugin['description']
    if len(plugin['options']):
      print >> sys.stderr, '   Arguments:'
      for argument_tup in enumerate(plugin['options'], start=1):
        print >> sys.stderr, '     %d: %s' % argument_tup


def StripTerminalCodes(s, strip=True):
  """Remove terminal escape codes for safer display.

  Args:
    s: The string to process
    strip: Optional parameter to disable terminal code stripping

  Returns:
    The string stripped of terminal codes.
  """
  if strip:
    return ''.join(s.split('\x1B'))
  return s


def main(args):
  active_plugins = list(GetPlugins(args.plugins))
  if not active_plugins:
    print >> sys.stderr, 'No plugins specified.'
    DisplayPluginList()
    sys.exit(1)
  if args.l:
    # Line by line mode
    for line in args.f:
      line = line.rstrip()
      result = plugin_handler.ProcessPlugins(line, active_plugins)
      print StripTerminalCodes(result, strip=args.ns)
  else:
    # Full file mode
    result = plugin_handler.ProcessPlugins(args.f.read(), active_plugins)
    print StripTerminalCodes(result, strip=args.ns)


if __name__ == '__main__':
  arg_parser = argparse.ArgumentParser()
  arg_parser.add_argument('-ns', action='store_false', default=True,
                          help='Preserve terminal codes in the output')
  arg_parser.add_argument('-l', action='store_true',
                          help='Process each line individually')
  arg_parser.add_argument('-f', type=argparse.FileType('r'), default=sys.stdin,
                          help='Input file')
  arg_parser.add_argument('plugins', nargs=argparse.REMAINDER,
                          help='The list of plugins and their arguments')
  main(arg_parser.parse_args())
