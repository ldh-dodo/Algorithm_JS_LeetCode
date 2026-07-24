/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
    const graph = Array.from({length : numCourses}, () => []); // graph[a] = [b, c, d]
    const indegree = Array.from({length : numCourses}, () => 0); // graph[a] = 3
    const q = [];
    const result = [];
    let head = 0;
    let count = 0;

    for(const [a, b] of prerequisites) {
        graph[b].push(a);
        indegree[a]++;
    }

    for(let i = 0; i < numCourses; i++) {
        if(indegree[i] === 0) q.push(i);
    }

    while(head < q.length) {
        const cur = q[head++];
        result.push(cur);
        count++;
        
        for(const next of graph[cur]) {
            indegree[next]--;
            if(indegree[next] === 0) q.push(next);
        }
    }

    return count === numCourses ? result : [];
}; 