/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function(mat) {
    // 1인 요소가 0과 얼마만큼 떨어져있는지 2차원 배열로 반환
    const m = mat.length;
    const n = mat[0].length;
    const dy = [-1, 1, 0, 0];
    const dx = [0, 0, -1, 1];

    const result = Array.from({length : m }, () => Array.from({length : n}, () => 0));
    const visited = Array.from({length : m }, () => Array.from({length : n}, () => false));
    const q = [];

    for(let y = 0; y < m; y++) {
        for(let x = 0; x < n; x++) {
            if(mat[y][x] === 0) {
                q.push([y, x, 0]);
                visited[y][x] = true;
            }
        }
    }

    let head = 0;

    while(head < q.length) {
        const [cy, cx, dist] = q[head++];

        for(let dir = 0; dir < 4; dir++) {
            const ny = cy + dy[dir];
            const nx = cx + dx[dir];

            if(ny < 0 || ny >= m || nx < 0 || nx >= n) continue;
            if(visited[ny][nx]) continue;

            result[ny][nx] = dist + 1;
            visited[ny][nx] = true;
            q.push([ny, nx, dist + 1]);
        }
    }

    return result;
};