module.exports = {

    /**
     * Bubble sort
     * Time complexity:
     *      Average case:   O(N²)
     *      Best case:      O(N) -> When the array is already sorted
     * Space complexity:
     *      Always:         O(N)
     * @param {any} array
     */
    bubbleSort: function(array) {
        if(!array) throw Error('Argument \'array\' should be truthy');
        for(var i = 0; i < array.length - 1; i++) {
            var swaps = 0;
            for(var j = 0; j < array.length - 1; j++) {
                if(array[j + 1] > array[j]) {
                    // swap
                    var buffer = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = buffer;
                    swaps++;
                }
            }
            if(swaps === 0)
                break;
        }
    },

    quickSort: function(array) {
        if(!array) throw Error('Argument \'array\' should be truthy');
        return array;
    },

    mergeSort: function(array) {
        if(!array) throw Error('Argument \'array\' should be truthy');
        return array;
    },

    heapSort: function(array) {
        if(!array) throw Error('Argument \'array\' should be truthy');
        return array;
    },

    insertionSort: function(array) {
        if(!array) throw Error('Argument \'array\' should be truthy');
        return array;
    }
}