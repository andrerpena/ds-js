var assert = require('chai').assert;
var Heap = require('../src/Heap');

describe('Heap', function () {
    it('Min heap', function () {
        var minHeap = new Heap();

        // the items that will be added to the heap
        var heapItems = [5, 1, 2, 3, 4];
        minHeap.add(heapItems);

        // a COPY of the above items but now sorted
        var heapItemsSorted = heapItems.concat().sort(function (a, b) { return a - b });

        for (var i = 0; i < heapItems.length; i++) {
            assert.strictEqual(minHeap.getPeek(), heapItemsSorted[i]);
            var polledItem = minHeap.poll();
            assert.strictEqual(polledItem, heapItemsSorted[i]);
        }

        assert.isNull(minHeap.getPeek()); // peek should be null because there's no element
        assert.isNull(minHeap.poll()); // poll should return null because there's no element
    });

    it('Max heap', function () {
        var minHeap = new Heap(1);

        // the items that will be added to the heap
        var heapItems = [5, 1, 2, 3, 4];
        minHeap.add(heapItems);

        // a COPY of the above items but now sorted
        var heapItemsSorted = heapItems.concat().sort(function (a, b) { return b - a });

        for (var i = 0; i < heapItems.length; i++) {
            assert.strictEqual(minHeap.getPeek(), heapItemsSorted[i]);
            var polledItem = minHeap.poll();
            assert.strictEqual(polledItem, heapItemsSorted[i]);
        }

        assert.isNull(minHeap.getPeek()); // peek should be null because there's no element
        assert.isNull(minHeap.poll()); // poll should return null because there's no element
    });
});;