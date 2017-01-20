function Heap(type) {
    // type should be 0 for 'min heap' and 1 for 'max heap'
    this.type = type === undefined ? 0 : type;
    this.items = [];
}

Heap.prototype.toString = function () {
    return this.items.toString();
}

Heap.prototype.getLength = function () {
    return this.items.length;
}

Heap.prototype.getLeftChildIndex = function (index) {
    return 2 * index + 1;
}

Heap.prototype.getRightChildIndex = function (index) {
    return 2 * index + 2;
}

Heap.prototype.getParentIndex = function (index) {
    return Math.floor((index - 1) / 2);
}

Heap.prototype.hasLeftChild = function (index) {
    return this.getLeftChildIndex(index) < this.items.length;
}

Heap.prototype.hasRightChild = function (index) {
    return this.getRightChildIndex(index) < this.items.length;
}

Heap.prototype.hasParent = function (index) {
    return this.getParentIndex(index) >= 0;
}

Heap.prototype.getLeftChild = function (index) {
    return this.hasLeftChild(index) ? this.items[this.getLeftChildIndex(index)] : null;
}

Heap.prototype.getRightChild = function (index) {
    return this.hasRightChild(index) ? this.items[this.getRightChildIndex(index)] : null;
}

Heap.prototype.getParent = function (index) {
    return this.hasParent(index) ? this.items[this.getParentIndex(index)] : null;
}

Heap.prototype.swap = function (index1, index2) {
    var index1Value = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = index1Value;
}

Heap.prototype.getPeek = function () {
    return this.items.length ? this.items[0] : null;
}

Heap.prototype.poll = function () {
    if (!this.items.length)
        return null;
    var item = this.items.splice(0, 1)[0];
    if (this.items.length) {
        var lastItem = this.items.splice(this.items.length - 1, 1)[0];
        this.items.splice(0, 0, lastItem);
        this.heapifyDown();
    }
    return item;
}

Heap.prototype.add = function (item) {
    if (item === undefined || item === null) throw Error('Argument \'item\' should be truthy');
    if (item instanceof Array) {
        for (var i = 0; i < item.length; i++) {
            this.add(item[i]);
        }
    }
    else {
        this.items.push(item);
        this.heapifyUp();
    }
}

Heap.prototype.heapifyUp = function () {
    if (!this.items.length)
        return;
    var _this = this;
    var index = this.items.length - 1;

    // function to return whether or not to swap up depending on the type of the heap
    var shouldSwapUp = function (index) {
        var shouldSwap = _this.type == 0
            // if it's a 'min heap', we should swap up if the parent is smaller
            ? _this.getParent(index) > _this.items[index]
            // if it's a 'max heap', we should swap up if the parent is bigger 
            : _this.getParent(index) < _this.items[index];
        return _this.hasParent(index) && shouldSwap;
    }

    while (shouldSwapUp(index)) {
        this.swap(index, this.getParentIndex(index));
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
            // if it's a 'min heap', we should pick the right child if it's smaller than the right
            ? _this.getRightChild(index) < _this.getLeftChild(index)
            // if it's a 'max heap', we should pick the right child if it's bigger than the left 
            : _this.getRightChild(index) > _this.getLeftChild(index);
        if (_this.hasRightChild(index) && shouldPickTheRightChild)
            targetChildIndex = _this.getRightChildIndex(index);
        return targetChildIndex;
    }

    var shouldSwapDown = function (childIndex) {
        return _this.type == 0
            ? _this.items[index] > _this.items[childIndex]
            : _this.items[index] < _this.items[childIndex]
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