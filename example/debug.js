var depugger = require('../');

var debug = depugger({debug: true, name: 'fooDebugger'});

debug('foo');
debug('bar "%s"', 'bax');
debug('spam %d eggs', 10);