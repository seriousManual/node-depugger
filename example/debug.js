var depugger = require('../');

var debug = depugger({debug: true, name: 'fooDebugger'});

debug('foo'); //output: [fooDebugger] foo
debug('bar "%s"', 'bax'); //output: [fooDebugger] bar "bax"
debug('spam %d eggs', 10); //output: [fooDebugger] spam 10 eggs

depugger(true, 'fooDebugger')('foo'); //output: [fooDebugger] foo

depugger(true)('foo'); //output: foo

depugger(false)('hello, i will not be logged!'); //output: -

depugger(false, 'barDebugger')('hello, i will not be logged, too!'); //output: -