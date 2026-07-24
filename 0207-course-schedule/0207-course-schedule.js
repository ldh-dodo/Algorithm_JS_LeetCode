/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const indegree = Array.from({length : numCourses}, () => 0);
    const graph = Array.from({length: numCourses}, () => Array.from({length: numCourses}, () => 0)); // 1: isConnected

    let count = 0;
    const q = [];
    let head = 0;
    // 전처리
    for(const [a, b] of prerequisites) {
        if(a === b) return false;
        graph[b][a] = 1;
        indegree[a]++;
    }

    indegree.forEach((target, idx) => {
        if(target === 0) q.push(idx);
    })

    if(q.length === 0) return false;

    while(head < q.length) {
        const idx = q[head++];
        count++;

        if(indegree[idx] !== 0) return false;

        for(let i = 0; i < numCourses; i++) {
            if(graph[idx][i] === 1) {
                indegree[i]--;
                if(indegree[i] === 0) q.push(i);
            }
        }
    }

    if(count !== numCourses) return false;

    return true;
};