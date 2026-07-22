/** 
class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
        let i = this.heap.length - 1;
    
        while(i > 0) {
            const parent = Math.floor((i - 1) / 2);

            if(this.heap[parent] <= this.heap[i]) break;

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

            if(left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;
            if(right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;

            if(smallest === i) break;

            [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
            i = smallest;
        }

        return top;
    }
}
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const pq = new MinHeap();
    
    for(const num of nums) {
        pq.push(num);
    }

    k = nums.length - k;

    for(let i = k; i > 0; i--) pq.pop();

    return pq.pop();
};