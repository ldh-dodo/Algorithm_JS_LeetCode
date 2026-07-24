class Minheap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    push(val) {
        this.heap.push(val);
        let i = this.heap.length - 1;

        while(i > 0) {
            const parent = Math.floor((i - 1) / 2);

            if(this.heap[parent][0] <= this.heap[i][0]) break;

            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }

    pop() {
        if(this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        let i = 0;

        while(true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if(left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if(right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;

            if(smallest === i) break;

            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }

        return top;
    }
}

function dijkstra(graph, start, n, k, dst) {
    const minEdges = Array(n).fill(Infinity);
    const pq = new Minheap();
    pq.push([0, start, 0]); // [cost, node, usedEdges]]

    while(pq.size() > 0) {
        const [cost, cur, usedEdges] = pq.pop();

        if(cur === dst) return cost;
        if(usedEdges === k + 1) continue;

        if(minEdges[cur] <= usedEdges) continue;
        minEdges[cur] = usedEdges;

        for(const [next, w] of graph[cur]) {
            pq.push([cost + w, next, usedEdges + 1]);
        }
    }

    return -1;
}


/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    const graph = Array.from({length: n}, () => []);

    for(const [from, to, price] of flights) {
        graph[from].push([to, price]); // [next, price]
    }
    
    return dijkstra(graph, src, n, k, dst);
};