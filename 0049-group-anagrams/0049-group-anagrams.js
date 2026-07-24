/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const hash = {};

    for(const str of strs) {
        const hashStr = str.split('').sort((a, b) => a.localeCompare(b)).join('');
            
        if(!hash[hashStr]) hash[hashStr] = [];
        hash[hashStr].push(str);
    }

    const result = [];
    for(const [key, value] of Object.entries(hash)) {
        result.push(value);
    }

    return result;
};