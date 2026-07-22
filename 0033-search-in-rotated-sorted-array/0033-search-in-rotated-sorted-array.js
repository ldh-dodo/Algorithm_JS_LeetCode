/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    function lowerbound(arr, target, left, right) {
        const lastIdx = right;

        while(left < right) {
            const mid = Math.floor((left + right) / 2);

            if(arr[mid] < target) left = mid + 1;
            else right = mid;
        }

        return (right < lastIdx && arr[right] === target) ? right : null;
    }

    function findK(arr) {
        let left = 0, right = arr.length;
        const target = arr[0];

        while(left < right) {
            const mid = Math.floor((left + right) / 2);
            if(arr[mid] < target) right = mid;
            else left = mid + 1;
        }

        return arr.length === right ? 0 : right;
    }

    const k = findK(nums);

    return lowerbound(nums, target, 0, k) ?? lowerbound(nums, target, k, nums.length) ?? -1;
};