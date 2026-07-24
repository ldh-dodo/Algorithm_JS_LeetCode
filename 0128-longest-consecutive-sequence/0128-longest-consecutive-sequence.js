/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    if(nums.length === 0) return 0;

    nums.sort((a, b) => a - b);

    const map = new Map();

    for(const num of nums) {
        if(map.has(num - 1)) map.set(num, map.get(num - 1) + 1);
        else map.set(num, 1);
    }

    let max = -Infinity;

   for(const [key, value] of map) {
    max = Math.max(max, value);
   }

   return max;
};