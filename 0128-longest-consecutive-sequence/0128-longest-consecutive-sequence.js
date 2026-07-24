/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    const set = new Set(nums);
    let max = 0;

    for(const num of set) {
        if(!set.has(num - 1)) {
            let cur = num;
            let len = 1;

            while(set.has(cur + 1)) {
                cur++;
                len++;
            }

            max = Math.max(max, len);
        }
    }

    return max;
};