var assert = require('chai').assert;
var sorter = require('../src/algo/sorter');

/**
 * Returns an array of random values (with repetition) of the given length 
 * @param {any} length
 * @param {any} max
 * @returns
 */
function getRandomArray(length, max) {
    if (!length) throw Error('Argument \'length\' should be truthy');
    if (!max) throw Error('Argument \'max\' should be truthy');
    return Array.apply(null, Array(length)).map(function (_, i) {
        return Math.round(Math.random() * max);
    });
}

/**
 * Generates a sorted array with the given length, starting at 0 
 * @param {any} length
 * @returns
 */
function generateSortedArray(length, asc) {
    var result = [];
    if (asc || asc === undefined) for (var i = 0; i < length; i++) result.push(i);
    else for (var i = length - 1; i >= 0; i--) result.push(i);
    return result;
}

/**
 * Returns whether the given array is sorted 
 * @param {any} array
 * @returns
 */
function isArraySorted(array) {
    if (!array) throw Error('Argument \'array\' should be truthy');
    for (var i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1])
            return false;
    }
    return true;
}


/**
 * Return whether the 2 arrays contains the same elements in the same order 
 * @param {any} array1
 * @param {any} array2
 * @returns
 */
function areArraysTheSame(array1, array2) {
    if (!array1) throw Error('Argument \'array1\' should be truthy');
    if (!array2) throw Error('Argument \'array2\' should be truthy');
    if (array1.length != array2.length)
        return false;
    for (var i = 0; i < array1.length; i++) {
        if (array1[i] != array2[i])
            return false;
    }
    return true;
}

/**
 * Tests a random array using the given sortFunction and the given size 
 * @param {any} sortFunction
 * @param {any} size
 */
function testRandomArray(sortFunction, size) {
    if (!sortFunction) throw Error('Argument \'sortFunction\' should be truthy');
    if (!size) throw Error('Argument \'size\' should be truthy');

    // creates an array with the given size. Elements will range from 0 to size and possibly repeated
    var array = getRandomArray(size, size);
    // clone the array so we can sort it. We have to clone in order to detect if the sorting algorithm is damaging the original
    var arrayClone = array.concat();
    arrayClone = sortFunction(arrayClone);
    assert.isTrue(isArraySorted(arrayClone));
    assert.isTrue(areArraysTheSame(array.sort(function (a, b) { return a - b }), arrayClone));
}

/**
 * Tests the specified sortFunction against the specified array 
 * @param {any} sortFunction
 * @param {any} size
 */
function testArray(sortFunction, array) {
    if (!sortFunction) throw Error('Argument \'sortFunction\' should be truthy');
    if (!array) throw Error('Argument \'array\' should be truthy');

    // clone the array so we can sort it. We have to clone in order to detect if the sorting algorithm is damaging the original
    var arrayClone = array.concat();
    arrayClone = sortFunction(arrayClone);
    assert.isTrue(isArraySorted(arrayClone));
    assert.isTrue(areArraysTheSame(array.sort(function (a, b) { return a - b }), arrayClone));
}

function runSortingTestSuite(sortFunction) {
    if (!sortFunction) throw Error('Argument \'sortFunction\' should be truthy');
    it('sorted 5 items', function () {
        testArray(sortFunction, [1, 2, 3, 4, 5]);
    });
    it('sorted descending 5 items', function () {
        testArray(sortFunction, [5, 4, 3, 2, 1]);
    });
    it('small 5 items (repeating numbers)', function () {
        testArray(sortFunction, [1, 1, 2, 2, 4]);
    });
    it('sorted 10,000 items', function () {
        testArray(sortFunction, generateSortedArray(10000));
    });
    it('sorted descending 10,000 items', function () {
        testArray(sortFunction, generateSortedArray(10000, false));
    });
    it('random 10,000 items', function () {
        testRandomArray(sortFunction, 10000);
    });
}

describe('sorter', function () {
    describe('bubblesort', function () {
        runSortingTestSuite(sorter.bubbleSort);
    });
    describe('quicksort', function () {
        runSortingTestSuite(sorter.quickSort);
    });
    describe('mergesort', function () {
        runSortingTestSuite(sorter.mergeSort);
    })
    describe('default Node.js Array sort function', function () {
        runSortingTestSuite(function (array) { return array.sort(function (a, b) { return a - b }) });
    });
});;