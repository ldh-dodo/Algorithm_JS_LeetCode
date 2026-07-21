/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    /**
    1: 육지
    0: 물
    
    */
    const m = grid.length;
    const n = grid[0].length;
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    const visited = Array.from({length : m }, () => Array.from({length : n}, () => false));
    let result = 0;

    const isValid = (y, x) => {
        return (y >= 0 && y < m && x >= 0 && x < n) && (!visited[y][x]) && (grid[y][x] === "1");
    }

    for(let y = 0; y < m; y++) {
        for(let x = 0; x < n; x++) {
            if(visited[y][x] || grid[y][x] === "0") continue;

            visited[y][x] = true;
            result++;
            dfs(y, x);
        }
    }

    function dfs(y, x) {
        for(let dir = 0; dir < 4; dir++) {
            const ny = y + dy[dir];
            const nx = x + dx[dir];

            if(isValid(ny, nx)) {
                visited[ny][nx] = true;
                dfs(ny, nx);
            }
        }
    }

    return result;
};