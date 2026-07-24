/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = Array.from({length: m}, () => Array.from({length: n}, () => Infinity));
    dp[0][0] = grid[0][0];

    for(let x = 1; x < n; x++) dp[0][x] = grid[0][x] + dp[0][x-1];
    for(let y = 1; y < m; y++) dp[y][0] = grid[y][0] + dp[y-1][0];

    for(let y = 1; y < m; y++) {
        for(let x = 1; x < n; x++) {
            dp[y][x] = Math.min(dp[y-1][x], dp[y][x-1]) + grid[y][x];
        }
    }

    return dp[m-1][n-1];
};