
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
        return this.has(key) ? this.items[key] : undefined
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

function Graph() {
    // 属性：顶点（数组）、边（字典）
    this.vertexes = [] // 顶点
    this.edges = new Dictionary() // 边

    // 方法
    // 1. 添加顶点
    Graph.prototype.addVertex = function (v) {
        this.vertexes.push(v)
        this.edges.set(v, [])
    }

    // 2. 添加边的方法
    Graph.prototype.addEdge = function (v1, v2) {
        // 针对无向图，暂不讨论有向图
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }

    // 3. toString
    Graph.prototype.toString = function () {
        // 1. 定义字符串，保存最终的结果
        let res = ''

        // 2. 遍历所有的顶点，以及顶点对应的边
        for (let i = 0; i < this.vertexes.length; i++) {
            res += this.vertexes[i] + '->'
            let vEdges = this.edges.get(this.vertexes[i])
            for (let j = 0; j < vEdges.length; j++) {
                res += vEdges[j] + ' '
            }
            res += '\n'
        }
        return res
    }

    // 初始化状态颜色
    Graph.prototype.initializeColor = function () {
        let colors = []
        for (let i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = 'white'
        }
        return colors
    }

    // 实现广度优先搜索 (BFS)
    Graph.prototype.bfs = function (initV, handler) {
        // 1. 初始化颜色
        let colors = this.initializeColor()

        // 2. 创建队列
        let q = new Queue()

        // 3. 将顶点加入到队列中
        q.enqueue(initV)

        // 4. 循环从队列中取出元素
        while (!q.isEmpty()) {
            // 4.1 从队列取出一个顶点
            let v = q.dequeue()

            // 4.2 获取和顶点相连的另外顶点
            let vList = this.edges.get(v)

            // 4.3 将v的颜色设置为灰色
            colors[v] = 'gray'

            // 4.4 遍历所有的顶点，并加入到队列中
            for (let i = 0; i < vList.length; i++) {
                let e = vList[i]
                if (colors[e] === 'white') {
                    colors[e] = 'gray'
                    q.enqueue(e)
                }
            }

            // 4.5 访问顶点
            handler(v)

            // 4.6 将顶点设置为黑色
            colors[v] = 'black'
        }

    }
    // 实现深度优先搜索 (DFS)
    Graph.prototype.dfs = function (initV, handler) {
        // 1. 初始化颜色
        let colors = this.initializeColor()

        // 2. 从某个顶点开始依次递归访问
        this.dfsVisit(initV, colors, handler)
    }
    Graph.prototype.dfsVisit = function (v, colors, handler) {
        // 1. 将颜色设置为灰色
        colors[v] = 'gray'

        // 2. 访问顶点
        handler(v)

        // 3. 访问v相连的顶点
        let vList = this.edges.get('v')
        for (let i = 0; i < vList.length; i++) {
            let e = vList[i]
            if (colors[e] === 'white') {
                this.dfsVisit(e, colors, handler)
            }
        }

        // 4. 将v设置为黑色
        colors[v] = 'black'
    }
}
// 测试
let g = new Graph()
let myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
// 添加顶点
for (let i = 0; i < myVertexes.length; i++) {
    g.addVertex(myVertexes[i])
}

// 添加边
g.addEdge('A', 'B')
g.addEdge('A', 'C')
g.addEdge('A', 'D')
g.addEdge('C', 'D')
g.addEdge('C', 'G')
g.addEdge('D', 'G')
g.addEdge('D', 'H')
g.addEdge('B', 'E')
g.addEdge('B', 'F')
g.addEdge('E', 'I')
console.log(g);

// 测试bfs
let res = ''
g.bfs(g.vertexes[0], function (v) {
    res += v + ' '
})
console.log(res);

// 测试dfs
res = ''
g.dfs(g.vertexes[0], function (v) {
    res += v + ' '
})
console.log(res);