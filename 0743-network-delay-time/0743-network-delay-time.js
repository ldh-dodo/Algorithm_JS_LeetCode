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

            if(i === smallest) break;

            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }

        return top;
    }
}

function djikstra(graph, start, n) {
    const dist = Array(n + 1).fill(Infinity);
    dist[start] = 0;

    const pq = new Minheap();
    pq.push([0, start]); // [dist, node]

    while(pq.size() > 0) {
        const [cost, cur] = pq.pop();

        if(cost > graph[cur]) continue;
        
        for(const [next, w] of graph[cur]) {
            const newCost = cost + w;
            if(newCost < dist[next]) {
                dist[next] = newCost;
                pq.push([newCost, next]);
            }
        }
    }

    return dist;
}

/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
    const graph = Array.from({length : n + 1}, () => []);

    for(const [u, v, w] of times) {
        graph[u].push([v, w]);
    }

    const dist = djikstra(graph, k, n);
    dist[0] = 0;

    if(dist.filter((el) => el === Infinity).length > 0) return -1;
    else return Math.max(...dist);
};