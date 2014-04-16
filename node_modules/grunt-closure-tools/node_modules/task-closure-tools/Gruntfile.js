/*jshint camelcase:false */
/*
 * Task Closure Tools
 * https://github.com/thanpolas/task-closure-tools
 *
 * Copyright (c) 2013 Thanasis Polychronakis
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Project configuration.
  grunt.initConfig({


    release: {
      options: {
        bump: true, //default: true
        file: 'package.json', //default: package.json
        add: true, //default: true
        commit: true, //default: true
        tag: true, //default: true
        push: true, //default: true
        pushTags: true, //default: true
        npm: true, //default: true
        tagName: 'v<%= version %>', //default: '<%= version %>'
        commitMessage: 'releasing v<%= version %>', //default: 'release <%= version %>'
        tagMessage: 'v<%= version %>' //default: 'Version <%= version %>'
      }
    },
    nodeunit: {
      all: [
        'test/**/*.test.js',
      ]
    },
    watch: {
      test: {
        files: [
          'test/{builder,compiler,depsWriter}/**/*.js',
          'tasks/**/*.js'
        ],
        tasks: ['test']
      },
      builder: {
        files: ['tasks/*.js'],
        tasks: ['closureBuilder:readyjs']
      },
      depsWriter: {
        files: ['tasks/*.js'],
        tasks: ['closureDepsWriter:todoApp']
      }
    },
  });

  // "npm test" runs these tasks,
  // run all the build tasks first.
  grunt.registerTask( 'test', [
    'nodeunit'
  ]);

  grunt.registerTask('default', ['test']);
};
