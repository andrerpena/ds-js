function Queue() {
    this.items = [];
}

/**
 * Enqueues one element
 * @param {any} obj
 */
Queue.prototype.enqueue = function (obj) {
    if (!obj) throw Error('Argument \'obj\' should be truthy');
    this.items.push(obj);
};

/**
 * Dequeues one element
 */
Queue.prototype.dequeue = function () {
    if (!this.items.length)
        return null;
    var deleted = this.items.splice(0, 1);
    return deleted[0];
};

/**
 * Returns the length of the queue 
 * @returns
 */
Queue.prototype.getLength = function() {
    return this.items.length;
};

module.exports.Queue = Queue;