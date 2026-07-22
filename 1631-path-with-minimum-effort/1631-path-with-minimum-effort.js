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
            const left = i * 2 + 1;
            const right = i * 2 + 2;

            if(left < this.heap.length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if(right < this.heap.length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;

            if(i === smallest) break;

            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }

        return top;
    }
}

function djikstra(graph, sy, sx, rows, cols) {
    const dist = Array.from({length: rows}, () => Array.from({length: cols}, () => Infinity));

    dist[sy][sx] = 0;

    const pq = new Minheap();
    pq.push([0, sy, sx]) // [cost, y, x];

    while(pq.size() > 0) {
        const [curEffort, cy, cx] = pq.pop();

        if(dist[cy][cx] < curEffort) continue;
        for(const [effort, ny, nx] of graph[cy][cx]) {
            const newCost = Math.max(curEffort, effort);

            if(newCost < dist[ny][nx]) {
                dist[ny][nx] = newCost;
                pq.push([newCost, ny, nx]);
            }
        }
    }

    return dist;
}

/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
    // (0, 0) -> (rows - 1, col - 1) 까지의 최소 effort를 구하라
    // effort: 절댓값 차이
    // backtracking + djikstra
    
    const rows = heights.length;
    const columns = heights[0].length;

    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    const graph = Array.from({length: rows}, () => Array.from({length: columns}, () => []));

    for(let y = 0; y < rows; y++) {
        for(let x = 0; x < columns; x++) {
            for(let dir = 0; dir < 4; dir++) {
                const ny = y + dy[dir];
                const nx = x + dx[dir];

                if(ny < 0 || ny >= rows || nx < 0 || nx >= columns) continue;

                const effort = Math.abs(heights[ny][nx] - heights[y][x]);
                graph[y][x].push([effort, ny, nx]);
            }
        }
    }

    const dist = djikstra(graph, 0, 0, rows, columns);
    
    return dist[rows - 1][columns -1];
};