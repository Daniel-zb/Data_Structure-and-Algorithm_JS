function Queue() {
    // 属性
    this.items = []
    // 方法
    // 1.enqueue(element):向队列末尾添加一个或多个元素
    Queue.prototype.enqueue = function (element) {
        this.items.push(element)
    }
    // 2.从队列中删除并返回队首元素
    Queue.prototype.dequeue = function () {
        return this.items.shift()
    }
    // 3.查看队首的元素
    Queue.prototype.front = function () {
        return this.items[0]
    }
    // 4.查看队列是否为空
    Queue.prototype.isEmpty = function () {
        return this.items.length === 0
    }
    // 5.返回队列中元素个数
    Queue.prototype.size = function () {
        return this.items.length
    }
    // 6.toString方法
    Queue.prototype.toString = function () {
        let result = ''
        for (let i = 0; i < this.items.length; i++) {
            result += this.items[i] + ' '
        }
        return result
    }
}
// 面试题：击鼓传花
function passGame(nameList, num) {
    // 1.创建一个队列
    let q = new Queue()
    // 2. 将所有人依次加入队列
    for (let i = 0; i < nameList.length; i++) {
        q.enqueue(i)
    }
    // 3. 开始数数，
    while (q.size() > 1) {
        // 不是num的时候，从队首弹出，加入到队尾
        for (let i = 0; i < num - 1; i++) {
            q.enqueue(q.dequeue())
        }
        // 数到num这个数时，将其弹出队列
        q.dequeue()
    }
    return nameList[q.front()]
}

// console.log(passGame(['a', 'b', 'c', 'd', 'e'], 3))