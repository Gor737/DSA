const merge = (left ,right) => {
    const res = [];
    let i = 0;
    let j = 0;
    while(i < left.length && j < right.length){
        if(left[i] < right[j])res.push(left[i++]);
        else res.push(right[j++]);
    }
    while(i < left.length){
        res.push(left[i++]);
    }
    while(j < right.length){
        res.push(right[j++]);
    }
    
    return res;
}

const mergerSort = (arr) => {
    if(arr.length === 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergerSort(arr.slice(0, mid));
    const right = mergerSort(arr.slice(mid));
    return merge(left, right);
}

const arr = [1, 2, 4, -0, 8, -45];
console.log(mergerSort(arr));