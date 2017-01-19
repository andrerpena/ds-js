function Heap(type) {
    // type should be 0 for 'min heap' and 1 for 'max heap'
    this.type = type === undefined ? 0 : type;
    this.items = [];
}

/**
 * Returns the left child index based on the given parent index 
 * @param {any} parentIndex
 * @returns
 */
Heap.prototype.getLeftChildIndex = function (index) {
    if (!index) throw Error('Argument \'index\' should be truthy');
    return 2 * index + 1;
}

Heap.prototype.getRightChildIndex = function (index) {
    if (!index) throw Error('Argument \'index\' should be truthy');
    return 2 * index + 2;
}

Heap.prototype.getParentIndex = function (index) {
    if (!index) throw Error('Argument \'index\' should be truthy');
    return Math.floor((index - 1) / 2);
}

Heap.prototype.hasLeftChild = function (index) {
    if (!index) throw Error('Argument \'index\' should be truthy');
    return this.getLeftChildIndex(index) < this.items.length;
}

Heap.prototype.hasRightChild = function (index) {
    if (!index) throw Error('Argument \'index\' should be truthy');
    return this.getRightChildIndex(index) < this.items.length;
}

Heap.prototype.hasParent = function (index) {
    if (!index) throw Error('Argument \'index\' should be truthy');
    return this.getParentIndex(index) >= 0;
}

Heap.prototype.getLeftChild = function (index) {
    if (!index) throw Error('Argument \'index\' should be truthy');
    return this.hasLeftChild(index) ? this.items[this.getLeftChildIndex()] : null;
}

Heap.prototype.getRightChild = function (index) {
    if (!index) throw Error('Argument \'index\' should be truthy');
    return this.hasRightChild(index) ? this.items[this.getRightChildIndex()] : null;
}

Heap.prototype.getParent = function (index) {
    if (!index) throw Error('Argument \'index\' should be truthy');
    return this.hasParent(index) ? this.items[this.getParentIndex()] : null;
}

Heap.prototype.swap = function (index1, index2) {
    if (!index1) throw Error('Argument \'index1\' should be truthy');
    if (!index2) throw Error('Argument \'index2\' should be truthy');

    var index1Value = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = index1Value;
}

Heap.prototype.getPeek = function () {
    return this.items.length ? this.items[0] : null;
}

Heap.prototype.poll = function () {
    var item = this.getPeek();
    if (item == null)
        return null;
    this.items[0] = this.items[this.items.length - 1];
    this.heapifyDown();
    return item;
}

Heap.prototype.add = function (item) {
    if (!item) throw Error('Argument \'item\' should be truthy');
    this.items.push(item);
    this.heapifyUp();
}

Heap.prototype.heapifyUp = function () {
    if (!this.items.length)
        return;
    var _this = this;
    var index = this.items.length - 1;

    // function to return whether or not to swap up depending on the type of the heap
    var shouldSwapUp = function (index) {
        var parentPredicate = _this.type == 0
            ? this.getParent(index) < this.items[index]  // if it's a 'min heap', we should swap up if the parent is smaller
            : this.getParent(index) > this.items[index]; // if it's a 'max heap', we should swap up if the parent is bigger
        return this.hasParent(index) && parentPredicate;
    }

    while (shouldSwapUp(index)) {
        this.swap(index, this.getParent(index));
        index = this.getParentIndex(index); // walk upwards
    }
}

Heap.prototype.heapifyDown = function () {
    if (!this.items.length)
        return;
    var _this = this;
    var index = 0;


    var pickBestChildIndexToSwap = function () {
        var targetChildIndex = _this.getLeftChildIndex(index);
        var shouldPickTheRightChild = _this.type == 0
            ? this.getRightChild(index) < this.getLeftChild(index)  // if it's a 'min heap', we should pick the right child if it's smaller than the right
            : this.getRightChild(index) > this.getLeftChild(index); // if it's a 'max heap', we should pick the right child if it's bigger than the left
        if (this.hasRightChild(index) && shouldPickTheRightChild)
            targetChildIndex = this.getRightChildIndex(index);
        return targetChildIndex;
    }

    var shouldSwapDown = function (childIndex) {
        return _this.type == 0
            ? this.items[index] > this.items[childIndex]
            : this.items[index] < this.items[childIndex]
    }

    while (this.hasLeftChild(index)) {
        var targetChildIndex = pickBestChildIndexToSwap();
        if (shouldSwapDown(targetChildIndex)) {
            this.swap(index, targetChildIndex);
        }
        else {
            break;
        }
        index = targetChildIndex;
    }
}

module.exports = Heap;