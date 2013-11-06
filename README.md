# node-depugger

[![Build Status](https://travis-ci.org/zaphod1984/node-depugger.png)](https://travis-ci.org/zaphod1984/node-depugger)

[![NPM](https://nodei.co/npm/depugger.png)](https://nodei.co/npm/depugger/)

[![NPM](https://nodei.co/npm-dl/depugger.png?months=3)](https://nodei.co/npm/depugger/)

````javascript
var debugger = require('depugger');

var debug = depugger({debug: true, name: 'fooDebugger'});

debug('foo');
debug('bar "%s"', 'bax');
debug('spam %d eggs', 10);

//output to console:
//[fooDebugger] foo
//[fooDebugger] bar "bax"
//[fooDebugger] spam 10 eggs

````