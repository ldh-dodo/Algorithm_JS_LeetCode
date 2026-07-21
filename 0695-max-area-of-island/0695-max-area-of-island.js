/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    /**
    1: island
    0: water
    */

    const m = grid.length;
    const n = grid[0].length;

    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];
    const visited = Array.from({length: m}, () => Array.from({length: n}, () => false));
    let max = 0;

    const isValid = (y, x) => {
        return (y >= 0 && y < m && x >= 0 && x < n) && (!visited[y][x]) && (grid[y][x] === 1);
    }

    for(let y = 0; y < m; y++) {
        for(let x = 0; x < n; x++) {
            if(visited[y][x] || (grid[y][x] === 0)) continue;

            visited[y][x] = true;
            max = Math.max(max, solve(y, x));
        }
    }

    function solve(y, x) {
        let area = 1;

        function dfs(y, x) {
            visited[y][x] = true;

            for(let dir = 0; dir < 4; dir++) {
                const ny = y + dy[dir];
                const nx = x + dx[dir];

                if(!isValid(ny, nx)) continue;

                area++;
                dfs(ny, nx);
            }
        }

        dfs(y, x);
        return area;
    }

    return max;
};