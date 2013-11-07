/**
 * stdbackend for the debugger
 * will be overwritten in unit tests
 * @type {Object}
 */
var stdBackend = {
    write: function(mssg) {
        console.log(mssg);
    }
};

module.exports = stdBackend;