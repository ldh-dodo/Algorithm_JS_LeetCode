/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    // 장애물 : 1
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    const dp = Array.from({length: m}, () => Array.from({length: n}, () => Infinity));
    dp[0][0] = 1;

    const result = findPath(m - 1, n - 1, dp);

    function findPath(y, x) {
        function exec(y, x) {
            if(y < 0 || x < 0 || obstacleGrid[y][x]) return 0;
            if(dp[y][x] !== Infinity) return dp[y][x];

            const pathCnt = exec(y, x-1) + exec(y-1, x);
            dp[y][x] = pathCnt;

            return pathCnt;
        }

        return exec(y, x);
    }

    return result;
};