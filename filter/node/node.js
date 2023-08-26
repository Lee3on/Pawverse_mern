class Node {
    constructor(key, depth = 0) {
        this.depth = depth;
        this.key = key;
        this.word = false;
        this.children = {};
        // Reference count for this node
        this.count = 0;
        // failure set
        //this.fail = {}; // Note: this.fail will be undefined by default if not set
    }
}
module.exports = Node;