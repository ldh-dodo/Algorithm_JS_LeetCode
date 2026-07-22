class Minheap {
    constructor() {
        this.heap = [];
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

            if(smallest === i) break;

            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }

        return top;
    }
};

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
    // point와 (0, 0) 거리 계산
    const pq = new Minheap();
    const result = [];

    for(const [x, y] of points) {
        const dist = x ** 2 + y ** 2;
        
        pq.push([dist, [x, y]]);
    }

    for(let i = k; i > 0; i--) {
        const [dist, coord] = pq.pop();
        result.push(coord);
    }

    return result;
};