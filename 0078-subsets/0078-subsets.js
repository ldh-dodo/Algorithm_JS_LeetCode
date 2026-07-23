/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    function combination(arr, r) {
        const result = [];

        function dfs(path, start) {
            if(path.length === r) {
                result.push([...path]);
                return;
            }

            for(let i = start; i < arr.length; i++) {
                path.push(arr[i]);
                dfs(path, i + 1);
                path.pop();
            }
        }

        dfs([], 0);

        return result;
    }

    const result = [];

    for(let i = 0; i <= nums.length; i++) {
        result.push(...combination(nums, i));
    }

    return result;
};