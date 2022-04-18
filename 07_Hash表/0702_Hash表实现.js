function HashTable() {
    // 属性
    this.storage = []
    this.count = 0
    this.limit = 7
    // 方法
    // hash函数
    HashTable.prototype.hashFunc = function (str, size) {
        // 定义hashcode变量
        let hashCode = 0
        // 霍纳算法，或者称秦九韶算法，计算hashCode的值
        for (let i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }

        // 取余操作
        let index = hashCode % size
        return index
    }

    // insert & 修改操作
    HashTable.prototype.insert = function (key, value) {
        // 根据key获取对应的index 
        let index = this.hashFunc(key, this.limit)

        // 根据index取出对应的bucket-桶
        let bucket = this.storage[index]

        // 判断该bucket是否为null
        if (bucket == null) {
            bucket = []
            this.storage[index] = bucket
        }
        // 判断是否是修改数据
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] == key) {
                tuple[1] = value
                return
            }
        }

        // 如果不是修改操作，就进行添加操作
        bucket.push([key, value])
        this.count += 1

        // 判断是否需要扩容
        if (this.count > this.limit * 0.75) {
            let newSize = this.limit * 2
            let newPrime = this.getPrime(newSize)
            rhis.resize(newPrime)
        }
    }

    // get方法
    HashTable.prototype.get = function (key) {
        // 根据index获取对应的bucket
        let index = this.hashFunc(key, this.limit)

        // 判断bucket是否为null
        if (this.storage[index] === null) { return null }
        // 如果不是null就进行线性查找
        let bucket = this.storage[index]
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] === key) { return tuple[1] }
        }
        // 如果没有找到
        return null
    }

    //delete
    HashTable.prototype.remove = function (key) {
        // 根据index获取对应的bucket
        let index = this.hashFunc(key, this.limit)

        // 判断bucket是否为null
        if (this.storage[index] === null) { return null }
        // 如果不是就进行线性查找
        let bucket = this.storage[index]
        for (let i = 0; i < bucket.length; i++) {
            let tuple = bucket[i]
            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.count--
                // 判断是否需要缩小容量
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    let newSize = Math.floor(this.limit / 2)
                    let newPrime = this.getPrime(newSize)
                    this.resize(newPrime)
                }
                return tuple[1]
            }
        }

        // 如果没有找到
        return null
    }

    // 其他方法
    // 判断hash表是否为空
    HashTable.prototype.isEmpty = function () {
        return this.count === 0
    }

    // 获取hash表中元素的个数
    HashTable.prototype.size = function () {
        return this.count
    }

    // hash表扩容/缩容
    HashTable.prototype.resize = function (newLimit) {
        // 保存旧的数组内容
        let oldStorage = this.storage

        // 重置所有属性
        this.storage = []
        this.count = 0
        this.limit = newLimit

        // 遍历oldStorage中所有的bucket
        for (let i = 0; i < oldStorage.length; i++) {
            // 取出对应的bucket
            let bucket = oldStorage[i]

            // 判断bucket是否为null
            if (bucket === null) {
                continue
            }

            // bucket中有数据的话就取出数据，重新insert
            for (let j = 0; j < bucket.length; j++) {
                let tuple = bucket[j]
                this.insert(tuple[0], tuple[i])
            }
        }

    }

    // 质数判断
    HashTable.prototype.isPrime = function (num) {
        if (num <= 1) { return false }

        let temp = parseInt(Math.sqrt(num))
        for (let i = 2; i < temp; i++) {
            if (num % i === 0) { return false }
        }
        return true
    }

    // 获取质数
    HashTable.prototype.getPrime = function (num) {
        while (!this.isPrime(num)) { num++ } return num
    }

}

// 测试
let ht = new HashTable()

// insert
ht.insert('abc', '123')
ht.insert('cba', '321')
ht.insert('nba', '520')
ht.insert('mba', '521')

// get
console.log(ht.get('abc'));

// 修改
ht.insert('abc', '111')
console.log(ht.get('abc'));

// delete
ht.remove('abc')
console.log(ht.get('abc'));
console.log(ht);
console.log(ht.isEmpty());
