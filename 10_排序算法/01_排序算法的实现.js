// 创建列表类
function ArrayList() {
    // 属性
    this.array = []

    // 方法
    // 将数据插入数组的方法
    ArrayList.prototype.insert = function (item) {
        this.array.push(item)
    }

    // toString方法
    ArrayList.prototype.toString = function () {
        return this.array.join('-')
    }

    // 排序算法
    // 交换两个位置的数据
    ArrayList.prototype.swap = function (m, n) {
        let temp = this.array[m]
        this.array[m] = this.array[n]
        this.array[n] = temp
    }
    // 冒泡排序,升序
    ArrayList.prototype.bubbleSort = function () {
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array.length - i - 1; j++) {
                if (this.array[j] > this.array[j + 1]) {
                    this.swap(j, j + 1)
                }
            }
        }
        return this.array
    }
    // 选择排序,升序
    ArrayList.prototype.selectSort = function () {
        for (let j = 0; j < this.array.length - 1; j++) {
            let min = j
            for (let i = min + 1; i < this.array.length; i++) {
                if (this.array[min] > this.array[i]) { min = i }
            }
            this.swap(min, j)
        }
        return this.array
    }
    // 插入排序,升序
    ArrayList.prototype.insertionSort = function () {
        // 外层循环：从第1个位置开始获取数据，向前面局部有序的序列插入
        for (let i = 0; i < this.array.length; i++) {
            // 内层循环：获取i位置的元素，和前面的数据依次进行比较
            let temp = this.array[i]
            let j = i
            while (this.array[j - 1] > temp && j > 0) {
                this.array[j] = this.array[j - 1]
                j--
            }
            // 将j位置的数据改成temp
            this.array[j] = temp
        }
    }
    // 希尔排序,升序
    ArrayList.prototype.shellSort = function () {
        // 初始化增量
        let gap = Math.floor(this.array.length / 2)
        while (gap >= 1) {
            // 以gap为间隔进行分组，对分组进行插入排序
            for (let i = gap; i < this.array.length; i++) {
                let temp = this.array[i]
                let j = i
                while (this.array[j - gap] > this.array[j] && j > gap - 1) {
                    this.array[j] = this.array[j - gap]
                    j -= gap
                }
                // 将j位置的元素赋值给temp
                this.array[j] = temp
            }
            // 增量变化
            gap = Math.floor(gap / 2)
        }
        return this.array
    }
    // 快速排序,升序
    // 选择枢纽
    ArrayList.prototype.media = function (left, right) {
        // 1. 取出中间的位置
        let center = Math.floor((left + right) / 2)
        // 2. 判断大小，并且进行交换
        if (this.array[left] > this.array[center]) { this.swap(left, center) }
        if (this.array[center] > this.array[right]) { this.swap(center, right) }
        if (this.array[left] > this.array[center]) { this.swap(left, center) }
        // 3. 将center处的数据换到right-1的位置
        this.swap(center, right - 1)
        return this.array[right - 1]
    }
    ArrayList.prototype.quickSort = function () {
        this.quick(0, this.array.length - 1)
        return this.array
    }
    ArrayList.prototype.quick = function (left, right) {
        // 1. 结束条件
        if (left >= right) return
        // 2. 获取枢纽
        let pivot = this.media(left, right)
        // 3. 定义变量，用于记录当前找到的位置
        let i = left
        let j = right - 1
        // 4.开始进行交换
        while (true) {
            while (this.array[++i] < pivot) { }
            while (this.array[--j] > pivot) { }
            if (this.array[i] < this.array[j]) { this.swap(i, j) } else { break }
        }
        // 5. 将枢纽放在正确的位置
        this.swap(i, right - 1)
        // 6. 分而治之
        this.quick(left, i - 1)
        this.quick(i + 1, right)
    }
}

// 测试类
let list = new ArrayList()

list.insert(66)
list.insert(88)
list.insert(12)
list.insert(87)
list.insert(100)
list.insert(5)
list.insert(566)
list.insert(23)
console.log(list.toString());
console.log(list.bubbleSort());
console.log(list.selectSort());
console.log(list.toString());
console.log(list.toString());
console.log(list.shellSort());
console.log(list.quickSort());
