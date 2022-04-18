// 封装优先级队列
function PriorityQueue() {
    // 重新创建一个类，可以理解成内部类
    function QueueElement(element, priority) {
        this.element = element
        this.priority = priority
    }
    // 属性
    this.items = []
    // 方法
    // 插入方法，其他方法和普通队列一样，不再赘述
    PriorityQueue.prototype.enqueue = function (element, priority) {
        // 1. 创建QueueElement对象
        let queueElement = new QueueElement(element, priority)
        if (this.items.length === 0) {
            this.items.push(queueElement)
        } else {
            let added = false
            for (let i = 0; i < this.items.length; i++) {
                if (queueElement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueElement)
                    added = true
                    break
                }
            }
            if (!added) { this.items.push(queueElement) }
        }
    }

    // 2.从队列中删除并返回队首元素
    PriorityQueue.prototype.dequeue = function () {
        return this.items.shift()
    }
    // 3.查看队首的元素
    PriorityQueue.prototype.front = function () {
        return this.items[0]
    }
    // 4.查看队列是否为空
    PriorityQueue.prototype.isEmpty = function () {
        return this.items.length === 0
    }
    // 5.返回队列中元素个数
    PriorityQueue.prototype.size = function () {
        return this.items.length
    }
    // 6.toString方法
    PriorityQueue.prototype.toString = function () {
        let result = ''
        for (let i = 0; i < this.items.length; i++) {
            result += this.items[i] + '-' + this.items.priority + ' '
        }
        return result
    }
}

let pq = new PriorityQueue()
pq.enqueue('abc', 11)
pq.enqueue('accc', 21)
pq.enqueue('aadc', 331)
pq.enqueue('aad22c', 31)
console.log(pq);