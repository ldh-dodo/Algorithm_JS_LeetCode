/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    /**
    0: 빈칸
    1 : 신선 오렌지
    2 : 썩은 오렌지

    매 분마다 썩은 오렌지 인접한 네 칸(상하좌우)도 썩음
    전체 썩을 때까지 걸리는 최소 minute 반환
    불가능시 -1
    
    */

    const m = grid.length
    const n = grid[0].length;
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    const visited = Array.from({length : m}, () => Array.from({length: n}, () => false));
    const q = [];
    let head = 0;
    let max = 0;

    // 썩은 오렌지 순회하면서 q에 삽입
    for(let y = 0; y < m; y++) {
        for (let x = 0; x < n; x++) {
            if(grid[y][x] === 2) {
                q.push([y, x, 0]);
                visited[y][x] = true;
            } else if(grid[y][x] === 0) visited[y][x] = true;
        }
    }
    
    while(head < q.length) {
        const [y, x, dist] = q[head++];
        
        for(let dir = 0; dir < 4; dir++) {
            const ny = y + dy[dir];
            const nx = x + dx[dir];

            if(ny < 0 || nx < 0 || ny >= m || nx >=n) continue;
            if(visited[ny][nx]) continue;

            q.push([ny, nx, dist + 1]);
            max = Math.max(max, dist + 1);
            visited[ny][nx] = true; 
        }
    }

    return visited.every((rows) => rows.every((el) => el === true)) ? max : -1;
};