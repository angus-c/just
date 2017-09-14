module.exports = partition;

/*
    partition([]); // []
    partition([1,2,3,4,5]); // [[1,2,3,4,5]]
    partition([1,2,3,4,5,6,7,8,9], 3); [[1,2,3],[4,5,6],[7,8,9]]
    partition([1,2,3,4,5,6,7,8,9], "3"); [[1,2,3],[4,5,6],[7,8,9]]
    partition(['a','b','c','d','e'], 2); [['a','b'],['c','d'],['e']]
    partition([1,2,3,4,5,6,7,8], 3); [[1,2,3],[4,5,6],[7,8]]
*/

function partition (arr, n) {
    if (!Array.isArray(arr)) return undefined;
    n = +n || arr.length;
    var length = arr.length,
        groups = [];
    for (var i = 0; i < length; i += n) {
        groups.push(arr.slice(i,i+n));
    }
    return groups;
}
