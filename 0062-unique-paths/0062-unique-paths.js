/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const dp = Array.from({length : m}, () => Array.from({length: n}, () => Infinity));
    dp[0][0] = 1;
    const result = findPath(m - 1, n - 1, dp);

    function findPath(y, x, dp) {
        function exec(y, x) {
            if(y < 0 || x < 0) return 0;
            if(dp[y][x] !== Infinity) return dp[y][x];

            const dist = exec(y, x - 1) + exec(y - 1, x);
            dp[y][x] = dist;

            return dist;
        }

        return exec(y, x);
    }

    return result;
};