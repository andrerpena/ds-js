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
        return array;
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
        return array;
    },

    mergeSort: function (array) {
        if (!array) throw Error('Argument \'array\' should be truthy');

        function ms(a) {
            if (!a) throw Error('Argument \'a\' should be truthy');
            if (a.length == 1)
                return a;

            var midPoint = Math.floor(a.length / 2);
            var firstHalf = ms(a.slice(0, midPoint));
            var secondHalf = ms(a.slice(midPoint, a.length));

            var i = 0; // first half interator
            var j = 0; // second half interator

            for (var z = 0; z < a.length; z++) {
                // if we're still running the 2 halves
                if ((i < firstHalf.length && firstHalf[i] <= secondHalf[j]) || (j >= secondHalf.length)) {
                    a[z] = firstHalf[i];
                    i++;
                }
                else if ((j < secondHalf.length && secondHalf[j] <= firstHalf[i]) || (i >= firstHalf.length)) {
                    a[z] = secondHalf[j];
                    j++;
                }
            }
            return a;
        }

        return ms(array);
    },

    heapSort: function (array) {
        if (!array) throw Error('Argument \'array\' should be truthy');
        return array;
    },

    insertionSort: function (array) {
        if (!array) throw Error('Argument \'array\' should be truthy');
        return array;
    }
};