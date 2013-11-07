# node-depugger

[![Build Status](https://travis-ci.org/zaphod1984/node-depugger.png)](https://travis-ci.org/zaphod1984/node-depugger)

[![NPM](https://nodei.co/npm/depugger.png)](https://nodei.co/npm/depugger/)

[![NPM](https://nodei.co/npm-dl/depugger.png?months=3)](https://nodei.co/npm/depugger/)

Depugger is a small lib that provides a debugging utility.

## depugger([debug, [name]]), depugger(options)

`depugger` returns a function that supports all of the `util.format` features and outputs debug messages based on the initial configuration.

* `debug`: specifies if logged messages should be outputted, optional, default: false
* `name`: a category key that will prepend every message, optional, default: ""
* `options`: options hash that can be used to submit all of the above parameters at once

````javascript
var depugger = require('depugger');

var debug = depugger(true, 'fooDebugger');

debug('foo');
debug('bar "%s"', 'bax');
debug('spam %d eggs', 10);

//output to console:
//[fooDebugger] foo
//[fooDebugger] bar "bax"
//[fooDebugger] spam 10 eggs
````

Alternatively all parameters can be specified via an options hash:
````javascript
var depugger = require('depugger');

var debug = depugger({debug: true, name: 'fooDebugger'});

debug('foo');
debug('bar "%s"', 'bax');
debug('spam %d eggs', 10);

//output to console:
//[fooDebugger] foo
//[fooDebugger] bar "bax"
//[fooDebugger] spam 10 eggs

````
