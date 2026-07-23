/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {
    const n = isConnected.length;
    const p = Array(n);
    const rank = Array(n);

    // make-set
    for(let i = 0; i < n; i++) {
        p[i] = i;
        rank[i] = 0;
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

    for(let u = 0; u < n; u++) {
        for(let v = 0; v < n; v++) {
            if(u === v || !isConnected[u][v]) continue;
            union(u, v);
        }
    }

    const result = new Set();

    for(let u = 0; u < n; u++) {
        result.add(find(u));
    }

    return result.size;
};