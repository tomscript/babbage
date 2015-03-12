Babbage is a simple and extensible open source tool for manipulating data.

### Use it: ###
- https://babbage-stable.appspot.com

### Code: ###
- https://github.com/tomscript/babbage

### Discuss: ###
- https://groups.google.com/forum/#!forum/babbage-discuss

### Install your own instance: ###
1. Create an App Engine project, note the application name.
2. git clone https://github.com/tomscript/babbage
3. Update dist/app.yaml with your application name.
4. $ appcfg update dist


If you plan to build and modify Babbage you'll want to know a bit more

I use grunt to build and do all sorts of cool things. So you'll want to add your App Engine app ID to app/app.yaml. Then do:

```
grunt build
```

This'll build everything which outputs to the dist directory. Then update away:

```
appcfg.py update dist
```

Local dev instance:
```
dev_appserver.py app
```

Run tests:
```
protractor test/protractor/conf.js
```

View my latest tests and experimental things at:
https://babbage-unstable.appspot.com/#/
