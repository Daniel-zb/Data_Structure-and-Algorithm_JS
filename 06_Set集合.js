function Set() {
    // 属性
    this.items = {}

    // 方法
    // add
    Set.prototype.add = function (value) {
        if (this.has(value)) { return false }
        // 将元素添加到集合中
        this.items[value] = value
        return true
    }

    // has
    Set.prototype.has = function (value) {
        return this.items.hasOwnProperty(value)
    }

    // remove
    Set.prototype.remove = function (value) {
        // 判断该集合是否包含该元素
        if (!this.has(value)) {
            return false
        }

        // 如果包含则从集合中删除
        delete this.items[value]
        return true
    }

    // clear
    Set.prototype.clear = function () {
        this.items = {}
    }

    // size
    Set.prototype.size = function () {
        return Object.keys(this.items).length
    }

    // 获取集合中所有的值
    Set.prototype.values = function () {
        return Object.keys(this.items)
    }

    // 并集
    Set.prototype.union = function (otherSet) {
        let unionSet = new Set()
        // 将本集合中所有的元素添加到新集合中
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        // 取出otherSet中的元素，判断是否需要加到新集合
        values = otherSet.values()
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }
        return unionSet
    }

    // 交集
    Set.prototype.intersection = function (otherSet) {
        let res = new Set()

        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                res.add(values[i])
            }
        }
        return res
    }

    // 差集
    Set.prototype.difference = function (otherSet) {
        let res = new Set()
        let values = this.values()
        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                res.add(values[i])
            }
        }
        return res
    }

    // 子集
    Set.prototype.subset = function (otherSet) {
        let res = new Set(), index = 0
        while (index++ < this.values().length) {
            if (!otherSet.has(this.values()[index])) { return false }
        }
        return true
    }
}
// 测试
// let set = new Set()
// console.log(set.add('a'));
// console.log(set.add('a'));
// console.log(set.add('ab'));
// console.log(set.add('ac'));
// console.log(set.add('ad'));
// console.log(set.values());
// console.log(set.remove('ac'));
// console.log(set.values());
// console.log(set.size());
// // console.log(set.clear());
// console.log(set.size());
// console.log(set);
let seta = new Set()
let setb = new Set()
seta.add('a')
setb.add('b')
setb.add('a')
seta.add('c')
let unionset = seta.union(setb)
let inters = seta.intersection(setb)
let diff = seta.difference(setb)
console.log(unionset.values());
console.log(inters.values());
console.log(diff.values());
console.log(seta.values());
console.log(setb.values());
console.log(seta.subset(setb));