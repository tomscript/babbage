# Task Closure Tools

The core library for the Closure Tools task, includes:

* **[Compiler](https://developers.google.com/closure/compiler/)** Compile your JS code using the powerful google closure compiler
* **[Builder](https://developers.google.com/closure/library/docs/closurebuilder)** Concatenate your JS codebase to a single file, optionally also compile it
* **[DepsWriter](https://developers.google.com/closure/library/docs/depswriter)** Calculate dependencies of your JS files and generate `deps.js`

## Applications

You can use the Closure Tools library as:

* A Grunt plugin [Grunt Closure Tools](https://github.com/closureplease/grunt-closure-tools)
* [Mantri](http://mantrijs.com) Depends on Closure Tools.

## Getting Started

Comming Soon!


## Release History

- **v0.1.6**, *12 Mar 2014*
  - Added test suite
  - Support for ClosureBuilder new JVM flags Thanks [@robertdimarco](https://github.com/robertdimarco)
- **v0.1.4**, *07 Mar 2014*
  - Properly escapes compiler filename, will fix cases where spaces existed in the filename. Thanks [@tgirardi](https://github.com/tgirardi)
- **v0.1.3**, *20 Feb 2014*
  - Added d32 and TieredCompilation optimization options to compiler java command, thanks [@probins](https://github.com/probins)
- **v0.1.2**, *13 Jan 2014*
  - Fixed bug that optExecOptions was passed only to first file in list by [@stforek](https://github.com/stforek).
- **v0.1.1**, *16 Dec 2013* Big Bang, moved codebase from original [`grunt-closure-tools` repo](https://github.com/closureplease/grunt-closure-tools).

## License
Copyright (c) 2013 Thanasis Polychronakis
Licensed under the [MIT license](LICENSE-MIT).
