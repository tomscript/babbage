/**
 * @fileOverview Bootstrap file.
 */

var builder = require('./lib/libBuilder');
var compiler = require('./lib/libCompiler');
var depsWriter = require('./lib/libDepsWriter');
var closureOpts = require('./lib/closureOptions');
var helpers = require('./lib/helpers');

var taskClosuretools = module.exports = {};

taskClosuretools.builder = builder;
taskClosuretools.compiler = compiler;
taskClosuretools.depsWriter = depsWriter;
taskClosuretools.closureOpts = closureOpts;
taskClosuretools.helpers = helpers;
