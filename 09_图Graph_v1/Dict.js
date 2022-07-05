// 自己封装的字典
function Dictionary() {
    // 属性
    this.items = {}

    // 方法
    // 添加键值对
    Dictionary.prototype.set = function (key, value) {
        this.items[key] = value
    }

    // 判断字典中是否有某个key
    Dictionary.prototype.has = function (key) {
        return this.items.hasOwnProperty(key)
    }
    // 从字典中移除某个元素
    Dictionary.prototype.remove = function (key) {
        // 1. 判断字典中是否有这个key
        if (!this.has(key)) return false

        // 2. 删除这个key
        delete this.items[key]
        return true
    }

    // 根据key获取value
    Dictionary.prototype.get = function (key) {
        return this.has(key) ? this.items(key) : undefined
    }

    // 获取所有的key
    Dictionary.prototype.getKeys = function () {
        return Object.keys(this.items)
    }

    // 获取所有的value
    Dictionary.prototype.getValues = function () {
        return Object.values(this.items)
    }

    // size
    Dictionary.prototype.size = function () {
        return this.keys().length
    }
    // clear
    Dictionary.prototype.clear = function () {
        this.items = {}
    }

}