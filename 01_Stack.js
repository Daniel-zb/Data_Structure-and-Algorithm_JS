// 封装栈
function Stack() {
    // 栈的属性
    this.items = []
    // 栈的操作
    // 1.将元素压入栈
    Stack.prototype.push = function (element) {
        this.items.push(element)
    }
    // 2.从栈中取出元素
    Stack.prototype.pop = function () {
        return this.items.pop()
    }
    // 3.查看一下栈顶元素
    Stack.prototype.peek = function () {
        return this.items[this.items.length - 1]
    }
    // 4.判断栈是否为空
    Stack.prototype.isEmpty = function () {
        return this.items.length === 0
    }
    // 5.获取栈中的元素的个数
    Stack.prototype.size = function () {
        return this.items.length
    }
    // 6.toString方法
    Stack.prototype.toString = function () {
        let result = ''
        for (let i = 0; i < this.items.length; i++) {
            result += this.items[i] + ' '
        }
        return result
    }
}

function decToBin(num) {
    let s = new Stack()
    while (num > 0) {
        s.push(num % 2)
        num = Math.floor(num / 2)
    }
    let res = ''
    while (!s.isEmpty()) {
        res += s.pop()
    }
    return res
}

console.log(decToBin(1000));