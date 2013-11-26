var expect = require('chai').expect;
var sandboxed = require('sandboxed-module');

var depugger = require('../');

function createBackend() {
    return { log: [], write: function(mssg) { this.log.push(mssg); } };
}

describe('debug', function() {
    it('should not log without parameter', function() {
        var mock = createBackend();
        var a = depugger({backend: mock});

        a('foo');
        a('bar');

        expect(mock.log).to.deep.equal([]);
    });

    it('should not log', function() {
        var mock = createBackend();
        var a = depugger({debug:false, backend: mock});

        a('foo');
        a('bar');

        expect(mock.log).to.deep.equal([]);
    });

    it('should log', function() {
        var mock = createBackend();
        var a = depugger({debug:true, backend: mock});

        a('foo');
        a('bar');

        expect(mock.log).to.deep.equal(['foo', 'bar']);
    });

    it('should prefix with name', function() {
        var mock = createBackend();
        var a = depugger({debug:true, name: 'fooName', backend: mock});

        a('foo');
        a('bar');

        expect(mock.log).to.deep.equal(['[fooName] foo', '[fooName] bar']);
    });

    it('should prefix with child chain', function() {
        var mock = createBackend();
        var a = depugger({debug:true, name: 'fooName', backend: mock});

        var child1 = a.child('child1');
        var child2 = child1.child('child2');

        child2('foo');

        expect(mock.log).to.deep.equal(['[fooName.child1.child2] foo']);
    });

    it('should prefix with child chain when parent has no name', function() {
        var mock = createBackend();
        var a = depugger({debug:true, backend: mock});

        var child1 = a.child('child1');

        child1('foo');

        expect(mock.log).to.deep.equal(['[child1] foo']);
    });

    it('should log with util.format interpolation', function() {
        var mock = createBackend();
        var a = depugger({debug:true, name: 'fooName', backend: mock});

        a('foo %s bax', 'bar');
        a('spam %d eggs', 10);

        expect(mock.log).to.deep.equal(['[fooName] foo bar bax', '[fooName] spam 10 eggs']);
    });

    describe('alternative utilation', function() {
        it('should not log when no definition is set', function() {
            var mock = createBackend();
            var depugger = sandboxed.require('../index', {
                requires: {
                    './stdBackend': mock
                }
            });

            var a = depugger();

            a('foo');

            expect(mock.log).to.deep.equal([]);
        });

        it('should not log when debug is set to false', function() {
            var mock = createBackend();
            var depugger = sandboxed.require('../index', {
                requires: {
                    './stdBackend': mock
                }
            });

            var a = depugger(false);

            a('foo');

            expect(mock.log).to.deep.equal([]);
        });

        it('should log if debug is set to true', function() {
            var mock = createBackend();
            var depugger = sandboxed.require('../index', {
                requires: {
                    './stdBackend': mock
                }
            });

            var a = depugger(true);

            a('foo');

            expect(mock.log).to.deep.equal(['foo']);
        });

        it('should log when debug is set to true using an submitted context name', function() {
            var mock = createBackend();
            var depugger = sandboxed.require('../index', {
                requires: {
                    './stdBackend': mock
                }
            });

            var a = depugger(true, 'fooBar');

            a('foo');

            expect(mock.log).to.deep.equal(['[fooBar] foo']);
        });

        it('should not log when debug is set to false althoug a name is set', function() {
            var mock = createBackend();
            var depugger = sandboxed.require('../index', {
                requires: {
                    './stdBackend': mock
                }
            });

            var a = depugger(false, 'fooBar');

            a('foo');

            expect(mock.log).to.deep.equal([]);
        });
    });
});