function binarySearch(sortedArray, search, lo, hi) {
    if (!sortedArray) throw Error('Argument \'sortedArray\' should be truthy');
    if (lo === undefined) lo = 0;
    if (hi === undefined) hi = sortedArray.length;

    if (lo === hi)
        return null;

    var midPoint = Math.floor((hi - lo) / 2) + lo;
    if (sortedArray[midPoint] === search)
        return midPoint;
    else if (sortedArray[midPoint] > search) {
        // we should search the first half
        return binarySearch(sortedArray, search, lo, midPoint);
    }
    else {
        // we should search the second half
        return binarySearch(sortedArray, search, midPoint + 1, hi)
    }
}

function binarySearchComparer(sortedArray, comparer, lo, hi) {
    if (!sortedArray) throw Error('Argument \'sortedArray\' should be truthy');
    if (lo === undefined) lo = 0;
    if (hi === undefined) hi = sortedArray.length;

    if (lo === hi)
        return null;

    var midPoint = Math.floor((hi - lo) / 2) + lo;

    var comparison = comparer(sortedArray[midPoint]);

    if (comparison === 0)
        return midPoint;
    else if (comparison > 0) {
        // we should search the first half
        return binarySearchComparer(sortedArray, comparer, lo, midPoint);
    }
    else {
        // we should search the second half
        return binarySearchComparer(sortedArray, comparer, midPoint + 1, hi)
    }
}

module.exports = {
    binarySearch: binarySearch,
    binarySearchComparer: binarySearchComparer
}