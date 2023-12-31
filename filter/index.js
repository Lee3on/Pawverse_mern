const Node = require('./node/node');

class Mint {
    constructor(keys, ops) {
        const len = keys.length;
        this.root = new Node('root');
        this.customCharacter = (ops && ops.customCharacter) || '*';

        for (let idx = 0; idx < len; idx++) {
            this.add(keys[idx], false);
        }
        this.build();
    }

    build() {
        const queue = [];
        queue.push(this.root);

        let idx = 0;
        while (queue.length > idx) {
            const beginNode = queue[idx];
            const map = beginNode.children;
            for (const key in beginNode.children) {
                const node = map[key];
                let failNode = beginNode.fail;

                while (failNode && !failNode.children[key]) {
                    failNode = failNode.fail;
                }

                node.fail = (failNode && failNode.children[key]) || this.root;
                queue.push(node);
            }

            idx++;
        }
    }

    search(text, options = { replace: true }) {
        let node = this.root;
        const fText = [];
        const oText = [];
        const words = [];

        const { replace = true, verify = false } = options;
        const textLen = text.length;

        for (let i = 0; i < textLen; i++) {
            const oKey = text[i];
            const key = oKey.toLowerCase();

            while (node && !node.children[key]) {
                node = node.fail;
            }
            node = (node && node.children[key]) || this.root;

            fText.push(oKey);
            oText.push(oKey);

            if (node.word) {
                let idx = i + 1 - node.depth;
                let word = '';
                while (idx <= i) {
                    const v = oText[idx];
                    word += v;
                    if (replace) {
                        fText[idx] = this.customCharacter;
                    }
                    idx++;
                }
                words.push(word);

                if (verify) {
                    break;
                }
            }
        }

        return {
            words,
            text: fText.join(''),
        };
    }

    filter(text, options) {
        return this.search(text, options);
    }

    verify(text) {
        const { words } = this.search(text, { verify: true });
        return !words.length;
    }

    delete(key) {
        const type = this.pop(key.toLowerCase(), key.length, this.root);
        this.build();
        return type;
    }

    pop(key, len, node, carry = 'delete', idx = 0) {
        if (!node) {
            return 'delete';
        }

        if (idx === len) {
            node.word = false;
            node.count--;

            let isDel = true;
            for (const k in node.children) {
                if (k) {
                    isDel = false;
                    break;
                }
            }

            return isDel ? carry : 'update';
        } else {
            const val = key[idx];
            const next = node.children[val];
            const type = this.pop(key, len, next, node.word ? 'update' : carry, idx + 1);
            node.count--;
            if (type === 'delete' && next && next.count === 0) {
                delete node.children[val];
            }
            return type;
        }
    }

    add(key, build = true) {
        const lowKey = key.toLowerCase();
        const len = lowKey.length;
        this.put(lowKey, len);

        if (build) {
            this.build();
        }

        return true;
    }

    put(key, len) {
        let node = this.root;
        const lastIdx = len - 1;
        node.count++;
        for (let idx = 0; idx < len; idx++) {
            const val = key[idx];
            const nextNode = node.children[val];

            if (nextNode) {
                nextNode.count++;
                node = nextNode;
            } else {
                const newNode = new Node(val, idx + 1);
                newNode.count = 1;
                node.children[val] = newNode;
                node = newNode;
            }

            if (lastIdx === idx && node.depth) {
                node.word = true;
            }
        }
    }
}

module.exports = Mint;