var util = require('util');

var stdBackend = require('./stdBackend');

var noop = function() {};

/**
 * returns a a function that is used to create debug messages
 * the logging of the messages happens in the context of the initializing factory method
 * @param pDebug flag that indicates if debugging should be activated
 * @param pName context name for debugging messages
 * @param pOptions options hash
 * @return {Function}
 */

function depugger(pDebug, pName, pOptions) {
    var debug, name, options, backend;

    if (typeof pDebug === 'object') {
        debug = !!pDebug.debug;
        name = pDebug.name || '';
        backend = pDebug.backend || stdBackend;
    } else {
        debug = !!pDebug;
        name = pName || '';
        backend = stdBackend;
    }

    var prefix = name ? util.format('[%s] ', name) : '';

    var logFunction = noop;

    if(debug) {
        logFunction = function() {
            if (!debug) {
                return;
            }

            var args = Array.prototype.splice.call(arguments, 0);
            var message = util.format.apply(null, args);

            message = prefix + message;

            backend.write(message);
        };
    }

    logFunction.child = function(childName) {
        var newName = name + '.' + childName;
        return depugger({debug: debug, name: newName, backend: backend});
    };

    return logFunction;
}

module.exports = depugger;