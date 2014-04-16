# grunt-appengine [![Build Status](https://travis-ci.org/101loops/grunt-appengine.png?branch=master)](https://travis-ci.org/101loops/grunt-appengine)

> Grunt task for running and managing App Engine



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-appengine --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-appengine');
```




## Appengine task
_Run this task with the `grunt appengine` command._



### Usage Example

```js
appengine: {
  options: {
    manageFlags: {
      oauth2: true
    },
    runFlags: {
      port: 8080
    }
  },
  
  frontend: {
		root: 'frontend/'
  },
  backend: {
  	root: 'backend/',
		backend: true,
		backendName: 'crawler'
  }
}
```

All options are optional.


**Running the dev server**

```shell
$ grunt appengine:frontend:run
```


**Update the frontend**

```shell
$ grunt appengine:frontend:update
```


**Update the backend**

```shell
$ grunt appengine:backend:update
```

## Release History

 * 2013-08-12   v0.0.1   initial publishing
 * 2013-08-13   v0.0.2   changed option 'folder' to 'root'
 * 2013-08-13   v0.0.3   added option 'env' to control process environment variables
 * 2013-08-13   v0.1.0   changed command order from 'appengine:<target>:<command>' to 'appengine:<command>:<target>'
 * 2013-08-14   v0.1.1   added support for GOPATH configuration
 * 2013-09-11   v0.1.2   removed run flag 'port', added config option 'stdio'
 * 2014-01-12   v0.1.3   added support for modules
 * 2014-01-13   v0.1.4   removed 'app.yaml' from default list of modules

---

Task submitted by [Stephan Behnke](http://stephanbehnke.com)

*This file was generated on Mon Jan 13 2014 18:52:52.*
