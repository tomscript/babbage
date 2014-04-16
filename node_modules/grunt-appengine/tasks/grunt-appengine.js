'use strict';

var path = require('path');

module.exports = function (grunt) {

  var _ = grunt.util._;

  var defaultOpts = {
    root: '.',

    manageScript: 'appcfg.py',
    manageFlags: {
      oauth2: true
    },

    runScript: 'dev_appserver.py',
    runFlags: {
      // empty
    },

    stdio: 'inherit'
  };

  function spawned(done, cmd, args, opts) {
    function spawnFunc() {
      var spawn = require('child_process').spawn;
      spawn(cmd, args || [], opts || {}).on('exit', function (status) {
        done(status === 0);
      });
    }

    return spawnFunc;
  }

  function createPath(opts) {
    var res = [];
    var root = opts['root'] || '.';
    var paths = opts['GOPATH'] || [];

    if (paths) {
      for (var i in paths) {
        res.push(path.resolve(path.join(root, paths[i])));
      }
    }

    return res;
  }

  // expecting 'appengine:<command>:<target>(:<profile>)'
  function validateArgs(args) {
    if (args.length === 0) {
      grunt.log.error('Unable to run task: no action specified (e.g. run or update)');
      return false;
    } else if (args.length === 1) {
      grunt.log.error('Unable to run task: no target specified');
      return false;
    } else if (args.length > 3) {
      grunt.log.error('Unable to run task: too many arguments (up to 4 allowed)');
      return false;
    }

    return true;
  }

  // ==== INTERFACE

  var exports = {
    execute: function (dryRun) {
      var self = this;
      var name = self.name || 'appengine';


      // ==== read task parameters

      var taskArgs = this.args || [];
      grunt.log.debug('Task args: ' + taskArgs);
      if (validateArgs(taskArgs) === false) {
        return false;
      }
      var action = taskArgs[0];
      var target = taskArgs[1];
      var profile = taskArgs[2] || "";

      if (!target || !grunt.config([name, target])) {
        grunt.log.error('Unable to run task: target \'' + target + '\' not found');
        return false;
      }

      var gruntTaskTargetProfileOpts = grunt.config([name, target, profile]) || {};
      var gruntTaskTargetOpts = grunt.config([name, target]) || {};
      var gruntTaskOpts = grunt.config([name, 'options']) || {};
      var taskOpts = _.defaults(
        gruntTaskTargetProfileOpts,
        gruntTaskTargetOpts,
        gruntTaskOpts,
        defaultOpts
      );
      //console.log(grunt.config([name, target, profile]));
      grunt.log.debug('Task opts: ' + JSON.stringify(taskOpts));
      var appDir = taskOpts['root'];


      // ==== assemble script name

      var cmd = taskOpts['manageScript'];
      var optsFlagsName = 'manageFlags';
      if (action === 'run') {
        cmd = taskOpts['runScript'];
        optsFlagsName = 'runFlags';
      }

      var taskFlagsOpts = _.defaults(
        gruntTaskTargetProfileOpts[optsFlagsName] || {},
        gruntTaskTargetOpts[optsFlagsName] || {},
        gruntTaskOpts[optsFlagsName] || {},
        defaultOpts[optsFlagsName] || {}
      );

      var sdk = taskOpts['sdk'];
      if (sdk) {
        cmd = sdk + '/' + cmd;
      }


      // ==== assemble script action

      var cmdAction = [];
      if (taskOpts['backend'] === true) {
        cmdAction.push('backends');
        cmdAction.push(appDir);
        cmdAction.push(action);

        var backendName = taskOpts['backendName'];
        if (backendName) {
          cmdAction.push(backendName);
        }
      } else {
        if (action !== 'run') {
          cmdAction.push(action);
        }
        var modules = taskOpts['modules'];
        if (modules) {
          for (var i in modules) {
            cmdAction.push(path.join(appDir, modules[i]));
          }
        } else {
          cmdAction.push(appDir);
        }
      }


      // ==== assemble script flags

      var cmdFlags = [];
      for (var attrname in taskFlagsOpts) {
        var attrval = taskFlagsOpts[attrname];
        if (attrval === true) {
          cmdFlags.push('--' + attrname);
        } else {
          cmdFlags.push('--' + attrname + '=' + attrval);
        }
      }


      // ==== assemble script process opts

      var cmdOpts = {};
      cmdOpts['env'] = process.env || {};

      var envTaskOpts = taskOpts['env'] || {};
      for (var envName in envTaskOpts) {
        cmdOpts['env'][envName] = envTaskOpts[envName];
      }

      cmdOpts['env'].GOPATH =
        createPath(gruntTaskOpts)
          .concat(createPath(gruntTaskTargetOpts))
          .concat(createPath(gruntTaskTargetProfileOpts)).join(':');

      cmdOpts['stdio'] = taskOpts['stdio'];

      grunt.log.debug('CMD opts: ' + JSON.stringify(cmdOpts));


      // ==== execute and return

      var cmdArgs = cmdFlags.concat(cmdAction);
      var fullCmd = cmd + ' ' + cmdArgs.join(' ');
      grunt.log.writeln('executing: ' + fullCmd);

      if (dryRun !== true) {
        var done = this.async();
        spawned(done, cmd, cmdArgs, cmdOpts)();
      } else {
        grunt.log.write('(dry run: script not executed)');
      }

      return {
        cmd: fullCmd,
        opts: cmdOpts
      };
    }
  };


  // ==== TASK

  grunt.registerTask('appengine', 'Managing App Engine.', exports.execute);


  return exports;
};
