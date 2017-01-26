var assert = require('chai').assert;
var Queue = require('../src/ds/Queue').Queue;

describe('Queue', function () {
    it('default behavior', function () {
        var queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);
        assert.strictEqual(queue.getLength(), 2);
        // removes one item
        var item = queue.dequeue();
        assert.strictEqual(item, 1);
        assert.strictEqual(queue.getLength(), 1);
        // removes another item
        item = queue.dequeue();
        assert.strictEqual(item, 2);
        assert.strictEqual(queue.getLength(), 0);

        assert.isNull(queue.dequeue());
    });
});