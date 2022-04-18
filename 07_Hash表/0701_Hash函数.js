// 设计Hash函数
function hashFunc(str, size) {
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

console.log(hashFunc('a', 7));
console.log(hashFunc('b', 7));
console.log(hashFunc('c', 7));
console.log(hashFunc('d', 7));