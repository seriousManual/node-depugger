var util = require('util');

var stdBackend = require('./stdBackend');

/**
 * returns a a function that is used to create debug messages
 * the logging of the messages happens in the context of the initializing factory method
 *
 * @param options
 * @return {Function}
 */

module.exports = function(pDebug, pName, pOptions) {
    var debug, name, options, backend;

    if(typeof pDebug === 'object') {
        debug = !!pDebug.debug;
        name = pDebug.name || '';
        backend = pDebug.backend || stdBackend;
    } else {
        debug = !!pDebug;
        name = pName || '';
        backend = stdBackend;
    }

    return function() {
        if(!debug) {
            return;
        }

        var args = [].splice.call(arguments, 0);
        var message = util.format.apply(null, args);

        if(name) {
            message = util.format('[%s] %s', name, message);
        }

        backend.write(message);
    }
};