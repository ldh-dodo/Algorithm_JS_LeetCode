/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    // 연속 X, 최댓값
    // DP[i] -> i까지 rob 했을 때의 최댓값  

    // dp1, dp2 -> 1번집 rob 2번집 rob
    const len = nums.length;
    const dp = Array(len + 1);
    dp[0] = 0;
    dp[1] = nums[0];

    for(let i = 2; i <= len; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i-1]);
    }

    return dp[len];
};