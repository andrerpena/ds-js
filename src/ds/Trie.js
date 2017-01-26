var ROOT_NODE_CHARACTER = ' ';

// Trie node
function TrieNode(c, isCompleteWord) {
    this.character = c;
    this.children = {};
    this.isCompleteWord = isCompleteWord;
}

TrieNode.prototype.find = function (c) {
    if (c in this.children)
        return this.children[c];
    return null;
};

/**
 * Adds a child key to the TrieNode
 * @param {string} c
 * @param {boolean} isCompleteWord
 * @returns
 */
TrieNode.prototype.add = function (c, isCompleteWord) {
    var node;
    if (node = this.find(c)) {
        node.isCompleteWord = isCompleteWord ? isCompleteWord : node.isCompleteWord;
    }
    else {
        node = this.children[c] = new TrieNode(c, isCompleteWord);
    }
    return node;
};

/**
 * Returns an array with all child TrieNodes
 * @returns
 */
TrieNode.prototype.getChildren = function () {
    var result = [];
    for (var key in this.children)
        result.push(this.children[key]);
    return result;
};

// Trie
function Trie() {
    this.rootNode = new TrieNode(ROOT_NODE_CHARACTER, false);
}

/**
 * Adds the given word to the trie
 * @param {any} word
 * @returns
 */
Trie.prototype.addWord = function (word) {
    if (!word) throw Error('Argument \'word\' should be truthy');
    var currentNode = this.rootNode;
    for (var i = 0; i < word.length; i++) {
        currentNode = currentNode.add(word[i], i == (word.length - 1));
    }
    return currentNode;
};

/**
 * Finds the given word. Returns a TrieNode if the word is found. Otherwise, returns null.
 * If completeWord is true and the found word is not 'isCompleteWord', returns null.
 * @param {any} word
 * @param {any} completeWord
 * @returns
 */
Trie.prototype.findWord = function (word, completeWord) {
    if (!word) throw Error('Argument \'word\' should be truthy');
    var currentNode = this.rootNode;
    for (var i = 0; i < word.length; i++) {
        currentNode = currentNode.find(word[i]);
        if (currentNode == null)
            return null;
    }
    if (completeWord && !currentNode.isCompleteWord)
        return null;
    return currentNode;
};


/**
 * Returns the total number of complete words found under the given root node
 */
Trie.prototype.countWords = function (rootNode) {
    var result = 0;
    var currentNode = rootNode || this.rootNode;
    var childNodes = currentNode.getChildren();
    if (currentNode.isCompleteWord)
        result++;
    for (var i = 0; i < childNodes.length; i++) {
        result += this.countWords(childNodes[i]);
    }
    return result;
};

module.exports.Trie = Trie;
module.exports.TrieNode = TrieNode;