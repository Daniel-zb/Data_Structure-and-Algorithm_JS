// 封装链表
function LinkedList() {
    // 内部类：Node-节点类
    function Node(data) {
        this.data = data
        this.next = null
    }
    // 属性
    this.head = null
    this.length = 0

    //1. 追加方法-
    LinkedList.prototype.append = function (data) {
        // 创建新的Node节点
        let newNode = new Node(data)
        // 判断是否是第一个节点
        if (this.length === 0) {
            this.head = newNode
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newNode
        }
        this.length += 1
    }

    // 2.toString方法
    LinkedList.prototype.toString = function () {
        // 1. 定义变量
        let current = this.head
        let listString = ''
        // 2. 循环获取链表上的每个Node
        while (current) {
            listString += current.data + ' '
            current = current.next
        }
        return listString
    }

    // 3. insert方法
    LinkedList.prototype.insert = function (position, data) {
        // 1. 对position进行越界判断
        if (position < 0 || position > this.length) return false
        // 2. 根据data创建新节点
        let newNode = new Node(data)
        if (position === 0) {   // 3. 判断要插入的位置是否为链表头部
            newNode.next = this.head
            this.head = newNode
        } else {
            let index = 0
            let cur = this.head
            while (index++ < position) {
                newNode.next = cur
                cur = cur.next
            }
            newNode.next.next = newNode
            newNode.next = cur
        }
        this.length += 1
        return true
    }

    // 4. get方法
    LinkedList.prototype.get = function (position) {
        // 1. 判断是否越界
        if (position < 0 || position >= this.length) {
            return null
        }
        // 2. 获取对应的data
        let cur = this.head
        let index = 0
        while (index++ < position) {
            cur = cur.next
        }
        return cur.data
    }

    // 5. indexOf方法
    LinkedList.prototype.indexOf = function (data) {
        let cur = this.head
        let index = 0

        while (cur) {
            if (cur.data === data) { return index }
            index += 1
            cur = cur.next
        }
        return -1
    }

    // 6. update方法
    LinkedList.prototype.update = function (position, newData) {
        if (position < 0 || position >= this.length) { return false }
        let cur = this.head
        let index = 0
        while (index++ < position) {
            cur = cur.next
        }
        cur.data = newData
        return true
    }

    // 7. removeAt方法
    LinkedList.prototype.removeAt = function (position) {
        if (position < 0 || position >= this.length) { return null }

        let cur = this.head
        if (position === 0) {
            this.head = this.head.next
        } else {
            let index = 0
            let pre = null
            while (index++ < position) {
                pre = cur
                cur = cur.next
            }
            pre.next = cur.next
        }
        this.length -= 1
        return cur.data
    }

    // 8. remove方法
    LinkedList.prototype.remove = function (data) {
        // 1. 获取data在链表中第一次出现的位置
        let position = this.indexOf(data)
        // 2. 根据位置信息，删除节点
        return this.removeAt(position)
    }

    // 9. isEmpty方法
    LinkedList.prototype.isEmpty = function () {
        return this.length === 0
    }

    // 10. size方法
    LinkedList.prototype.size = function () {
        return this.length
    }
}

let l = new LinkedList()
l.append('a')
l.append('b')
l.append('c')
l.append('d')
l.insert(2, 'aaa')
l.insert(3, 'adasaaa')
l.insert(0, 'adasadaa')
console.log(l.indexOf('c'))
console.log(l);
console.log(l.get(3));
console.log(l.toString());
console.log(l.removeAt(0));
console.log(l.remove('a'));
console.log(l.update(3, '565'));