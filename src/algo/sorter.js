/**
 * Swaps the i and j indexes of the array array 
 * @param {any} array
 * @param {any} i
 * @param {any} j
 */
function swap(array, i, j) {
    if (!array) throw Error('Argument \'array\' should be truthy');
    if (i == j)
        return;
    var buffer = array[j];
    array[j] = array[i];
    array[i] = buffer;
}

module.exports = {

    /**
     * Bubble sort
     * Time complexity:
     *      Average case:   O(N²)
     *      Best case:      O(N) -> When the array is already sorted
     * Space complexity:
     *      Always:         O(N) -> No extra allocation
     * @param {any} array
     */
    bubbleSort: function (array) {
        if (!array) throw Error('Argument \'array\' should be truthy');
        for (var i = 0; i < array.length - 1; i++) {
            var swaps = 0;
            for (var j = 0; j < array.length - 1; j++) {
                if (array[j] > array[j + 1]) {
                    // swap
                    swap(array, j, j + 1);
                    swaps++;
                }
            }
            if (swaps === 0)
                break;
        }
    },

    quickSort: function (array) {
        if (!array) throw Error('Argument \'array\' should be truthy');

        /**
         * This will assume the last item of the given array as the pivot.
         * @param {any} array
         * @returns the position of the pivot.
         * Every item lower than the pivot will be to the left.
         * Every item higher than the pivot will be to the right
         */
        function partition(a, lo, hi) {
            if (!a) throw Error('Argument \'array\' should be truthy');
            if (a.length == 1)
                return 0;
            var pivot = a[hi];
            // i is the position of the first item that is greater than the pivot
            // at the and. i will be swapped with the pivot and be returned
            var i = lo;
            for (var j = lo; j < hi; j++) {
                if (a[j] <= pivot) {
                    swap(a, i, j);
                    i++;
                }
            }
            swap(a, i, hi);
            return i;
        }

        /**
         * The actual quicksort algorithm 
         * @param {any} array The array to sort
         * @param {any} lo The starting index
         * @param {any} hi The ending index
         */
        function qs(array, lo, hi) {
            if (lo < hi) {
                var i = partition(array, lo, hi);
                qs(array, lo, i - 1);
                qs(array, i + 1, hi);
            }
        }

        qs(array, 0, array.length - 1);
    },

    mergeSort: function (array) {
        if (!array) throw Error('Argument \'array\' should be truthy');
        return array;
    },

    heapSort: function (array) {
        if (!array) throw Error('Argument \'array\' should be truthy');
        return array;
    },

    insertionSort: function (array) {
        if (!array) throw Error('Argument \'array\' should be truthy');
        return array;
    }
}