var assert = require('chai').assert;
var searcher = require('../src/algo/searcher');

describe('searcher', function () {
    describe('binarySearch', function () {
        it('default case', function () {
            assert.strictEqual(searcher.binarySearch([1, 2, 3, 4], 2), 1);
        });
        it('single element existing', function () {
            assert.strictEqual(searcher.binarySearch([1], 1), 0);
        });
        it('odd number of elements', function () {
            assert.strictEqual(searcher.binarySearch([0, 1, 2], 0), 0);
        });
        it('unexisting element', function () {
            assert.strictEqual(searcher.binarySearch([0, 1, 2], 10), null);
        });
        it('repeating elements', function () {
            var result = searcher.binarySearch([0, 1, 1, 1], 1);
            assert.ok([1, 2, 3].indexOf(result) > -1);
        });
    });
    describe('binarySearchComparer', function () {
        it('default case', function () {
            var array = [
                { price: 3, category: 0 },
                { price: 5, category: 1 },
                { price: 7, category: 0 }
            ];
            var priceToFind = 5;
            var indexFound = searcher.binarySearchComparer(array, function (obj) {
                if (obj.price === priceToFind) return 0; // found!
                else if (obj.price > priceToFind) return 1;
                else return -1;
            });
            assert.strictEqual(indexFound, 1);
        });
        it('repeating elements', function () {
            var array = [
                { price: 0, category: 0 },
                { price: 0, category: 1 },
                { price: 12, category: 0 },
                { price: 13, category: 2 }
            ];
            var priceToFind = 13;
            var indexFound = searcher.binarySearchComparer(array, function (obj) {
                if (obj.price === priceToFind) return 0; // found!
                else if (obj.price > priceToFind) return 1;
                else return -1;
            });
            assert.strictEqual(indexFound, 3);
        });
    });
});;