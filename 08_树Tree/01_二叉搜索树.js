// 封装二叉搜索树
function BinarySearchTree() {
    function Node(key) {
        this.key = key
        this.left = null
        this.right = null
    }

    // 属性
    this.root = null

    // 方法
    // 插入节点
    BinarySearchTree.prototype.insert = function (key) {
        // 根据key创建节点
        let newNode = new Node(key)
        // 判断根节点是否存在
        if (this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    BinarySearchTree.prototype.insertNode = function (node, newNode) {
        if (newNode.key < node.key) {
            // 向左查找
            if (node.left === null) { node.left = newNode } else { this.insertNode(node.left, newNode) }
        } else {
            //向右查找
            if (node.right === null) { node.right = newNode } else { this.insertNode(node.right, newNode) }
        }
    }

    // 树的遍历
    // 1. 先序遍历
    BinarySearchTree.prototype.preOrderTraverse = function () {
        let res = []
        this.preOrderTraverseNode(this.root, res)
        return res
        // console.log(res);
    }

    BinarySearchTree.prototype.preOrderTraverseNode = function (node, res) {
        if (node !== null) {
            // 处理经过的节点
            res.push(node.key);

            // 处理经过节点的左子节点
            this.preOrderTraverseNode(node.left, res)

            // 处理经过节点的右子节点
            this.preOrderTraverseNode(node.right, res)
        }
    }

    // 2. 中序遍历
    BinarySearchTree.prototype.midOrderTraverse = function () {
        let res = []
        this.midOrderTraverseNode(this.root, res)
        return res
        // console.log(res);
    }

    BinarySearchTree.prototype.midOrderTraverseNode = function (node, res) {
        if (node !== null) {
            // 处理经过节点的左子节点
            this.midOrderTraverseNode(node.left, res)

            // 处理经过的节点
            res.push(node.key);

            // 处理经过节点的右子节点
            this.midOrderTraverseNode(node.right, res)
        }
    }

    // 3. 后序遍历
    BinarySearchTree.prototype.postOrderTraverse = function () {
        let res = []
        this.postOrderTraverseNode(this.root, res)
        return res
        // console.log(res);
    }

    BinarySearchTree.prototype.postOrderTraverseNode = function (node, res) {
        if (node !== null) {
            // 处理经过节点的左子节点
            this.postOrderTraverseNode(node.left, res)

            // 处理经过节点的右子节点
            this.postOrderTraverseNode(node.right, res)

            // 处理经过的节点
            res.push(node.key);
        }
    }

    // 获取二叉树的最大值
    BinarySearchTree.prototype.max = function () {
        let node = this.root
        while (node.right !== null) {
            node = node.right
        }
        return node.key
    }

    // 获取二叉树的最小值
    BinarySearchTree.prototype.min = function () {
        let node = this.root
        while (node.left !== null) {
            node = node.left
        }
        return node.key
    }

    // 搜索某一个key
    BinarySearchTree.prototype.search = function (key) {
        let node = this.root
        while (node !== null) {
            if (node.key === key) return true
            else { node = key < node.key ? node.left : node.right }
        }
        return false
    }

    // 删除节点
    BinarySearchTree.prototype.remove = function (key) {
        // 寻找要删除的节点
        // 1.1 定义变量，保存一些信息
        let cur = this.root
        let par = null
        let isLeftChild = true

        // 1.2 开始寻找删除的节点
        while (cur.key != key) {
            par = cur
            if (key < cur.key) {
                isLeftChild = true
                cur = cur.left
            } else {
                isLeftChild = false
                cur = cur.right
            }
            // 如果已经找到了最后的节点，依然没有找到
            if (cur === null) { return false }
        }

        // 2. 根据对应的情况删除节点
        // 找到了cur.key === key
        // 2.1 要删除的节点是叶子节点
        if (cur.left === null && cur.right === null) {
            if (cur === this.root) { this.root = null }
            else if (isLeftChild) { par.left = null }
            else { par.right = null }
        }
        // 2.2 要删除的节点有一个叶子节点
        else if (cur.right === null) {
            if (cur === this.root) { this.root = cur.left }
            else if (isLeftChild) { par.left = cur.left }
            else { par.right = cur.left }
        }
        else if (cur.left === null) {
            if (cur === this.root) { this.root = cur.right }
            else if (isLeftChild) { par.left = cur.right }
            else { par.right = cur.right }
        }
        // 2.3 要删除的节点有两个子节点
        // 删除某个有两个子节点的节点时，需要从其两个字树中选出值最接近其的节点替换之
        // 这个最接近其的节点要么是左子树中的最大值-前驱，要么是右子树中的最小值-后继
        else {
            // 1. 获取后继节点
            let successor = this.getSuccessor(cur)

            // 2. 判断是否是根节点
            if (cur === this.root) {
                this.root = successor
            } else if (isLeftChild) {
                par.left = successor
            } else { par.right = successor }

            // 3. 将删除节点的左子树置为cur.left
            successor.left = cur.left
        }

    }

    // 找后继的方法
    BinarySearchTree.prototype.getSuccessor = function (delNode) {
        // 1. 定义变量，保存找到的后继
        let successor = delNode
        let cur = delNode.right
        let successorPar = delNode

        // 2. 循环查找
        while (cur !== null) {
            successorPar = successor
            successor = cur
            cur = cur.left
        }

        // 3. 判断寻找的后继节点是否时delNode的right节点
        if (successor !== delNode.right) {
            successorPar.left = successor.right
            successor.right = delNode.right
        }
        return successor
    }
}

// 测试
let bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)
console.log(bst.preOrderTraverse());
console.time('x')
bst.remove(9)
bst.remove(7)
bst.remove(15)
console.log(bst.preOrderTraverse());
console.timeEnd('x')
console.log(null)


// console.log(bst.preOrderTraverse());
// console.log(bst.midOrderTraverse());
// console.log(bst.postOrderTraverse());
// console.log(bst.max());
// console.log(bst.min());
// console.log(bst.search(25));
// console.log(bst.search(24));
// console.log(bst.search(2));


