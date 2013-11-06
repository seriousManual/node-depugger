var expect = require('chai').expect;

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

    it('should log with util.format interpolation', function() {
        var mock = createBackend();
        var a = depugger({debug:true, name: 'fooName', backend: mock});

        a('foo %s bax', 'bar');
        a('spam %d eggs', 10);

        expect(mock.log).to.deep.equal(['[fooName] foo bar bax', '[fooName] spam 10 eggs']);
    });
});