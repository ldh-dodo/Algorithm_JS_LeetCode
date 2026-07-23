/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    function permutation(arr, r) {
        const visited = Array(arr.length).fill(false);
        const result = [];

        function dfs(path) {
            if(path.length === r) {
                result.push([...path]);
            }
            
            for(let i = 0; i < arr.length; i++) {
                if(visited[i]) continue;

                visited[i] = true;
                path.push(arr[i]);
                dfs(path);
                visited[i] = false;
                path.pop();
            }
        }

        dfs([]);

        return result;
    }

    return permutation(nums, nums.length);
};