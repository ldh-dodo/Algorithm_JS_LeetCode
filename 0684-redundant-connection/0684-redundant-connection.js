/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    const n = edges.length;
    
    const p = Array(n+1);
    const rank = Array(n+1);

    for(let u = 1; u <= n; u++) {
        p[u] = u;
        rank[u] = 0;
    }

    function union(u, v) {
        const uR = find(u);
        const vR = find(v);

        if(uR === vR) return false;

        if(rank[uR] < rank[vR]) {
            p[uR] = vR;
        } else {
            p[vR] = uR;
            if(rank[uR] === rank[vR]) rank[uR]++;
        }

        return true;
    }

    function find(u) {
        while(u !== p[u]) u = p[u] = p[p[u]];
        return u;
    }
    let result = null;

    for(let i = 0; i < n; i++) {
        const [u, v] = edges[i];

        if(!union(u,v)) result = [u, v]; 
    }

    return result;
};