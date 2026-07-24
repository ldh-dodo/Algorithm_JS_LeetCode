/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    // dp[i] i원을 만들 수 있는 최소 동전 개수
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    coins.sort((a,b) => a - b);
    for(let i = 1; i <= amount; i++) {
        for(const coin of coins) {
            if(i < coin) break;

            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }

    return dp[amount] !== Infinity ? dp[amount] : -1;
};