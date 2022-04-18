// 封装双向链表
function DoubleLinkedList() {
    // 属性
    this.head = null
    this.tail = null
    this.length = 0

    // 内部的类：节点类
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }

    // 1.append
    DoubleLinkedList.prototype.append = function (data) {
        let newNode = new Node(data)
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail.next = newNode
            newNode.prev = this.tail
            this.tail = newNode
        }
        this.length += 1
    }

    // 2. 将链表转成字符串形式
    DoubleLinkedList.prototype.toString = function () {
        return this.backwardString()
    }

    // 2.1 从tail到head,
    DoubleLinkedList.prototype.forwardString = function () {
        let cur = this.tail
        let result = ''
        while (cur) {
            result += cur.data + ' '
            cur = cur.prev
        }
        return result
    }

    // 2.2 从head到tail
    DoubleLinkedList.prototype.backwardString = function () {
        let cur = this.head
        let result = ''
        while (cur) {
            result += cur.data + ' '
            cur = cur.next
        }
        return result
    }

    // 3.insert
    DoubleLinkedList.prototype.insert = function (position, data) {
        // 1越界判断
        if (position < 0 || position > this.length) return false

        // 2根据data创建新的节点
        let newNode = new Node(data)

        // 3判断原来的列表是否为空
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            // 3.1判断position是否为0
            if (position === 0) {
                this.head.prev = newNode
                newNode.next = this.head
                this.head = newNode
            } else if (position === this.length) {
                newNode.prev = this.tail
                this.tail.next = newNode
                this.tail = newNode
            } else {
                let cur = this.head
                let index = 0
                while (index++ < position) {
                    cur = cur.next
                }
                newNode.next = cur
                newNode.prev = cur.prev
                cur.prev.next = newNode
                cur.prev = newNode
            }
        }
        this.length += 1
        return true
    }

    // 4. get
    DoubleLinkedList.prototype.get = function (position) {
        if (position < 0 || position >= this.length) { return null }

        let cur = this.head
        let index = 0
        while (index++ < position) {
            cur = cur.next
        }
        return cur.data
    }

    // 5. indexOf
    DoubleLinkedList.prototype.indexOf = function (data) {
        let cur = this.head, index = 0
        while (cur) {
            if (cur.data === data) { return index }
            else {
                cur = cur.next
                index += 1
            }
        }
        return -1
    }

    // 6. update
    DoubleLinkedList.prototype.update = function (position, newData) {
        if (position < 0 || position >= this.length) { return false }
        let index = 0, cur = this.head
        while (index++ < position) {
            cur = cur.next
        }
        cur.data = newData
        return true
    }

    // 7. removeAt
    DoubleLinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) { return null }

        // 判断链表是否只有一个节点
        if (this.length === 1) {
            this.head = null
            this.tail = null
            return this.head.data
        } else {
            if (position === 0) {
                let res = this.head.data
                this.head = this.head.next
                this.head.prev.next = null
                this.head.prev = null
                return res
            } else if (position === this.length - 1) {
                let res = this.tail.data
                this.tail = this.tail.prev
                this.tail.next.prev = null
                this.tail.next = null
                return res
            } else {
                let index = 0, cur = this.head
                while (index++ < position) {
                    cur = cur.next
                }
                let res = cur.data
                cur.next.prev = cur.prev
                cur.prev.next = cur.next
                cur.prev = null
                cur.next = null
                return res
            }
        }
        this.length -= 1
    }

    // 8. remove
    DoubleLinkedList.prototype.remove = function (data) {
        let index = this.indexOf(data)
        return this.removeAt(index)
    }

    // 9. isEmpty
    DoubleLinkedList.prototype.isEmpty = function () {
        return this.length === 0
    }

    // 10. size
    DoubleLinkedList.prototype.size = function () {
        return this.length
    }

    // 11. 获取head元素
    DoubleLinkedList.prototype.getHead = function () {
        return this.head.data
    }
    // 12. 获取tail元素
    DoubleLinkedList.prototype.getTail = function () {
        return this.tail.data
    }
}

let lst = new DoubleLinkedList()
lst.append('abc')
lst.append('cba')
lst.append('nba')
lst.append('abcdd')
lst.append('abcdd')
lst.insert(3, 'add')
// console.log(lst);
// console.log(lst.backwardString());
// console.log(lst.forwardString());
console.log(lst.get(2));
console.log(lst.indexOf('add'));
console.log(lst.indexOf('adddd'));
console.log(lst.update(1, 'fsdfsdf'));
console.log(lst);
console.log(lst.removeAt(2));
console.log(lst.remove('fsdfsdf'));
console.log(lst.getHead());