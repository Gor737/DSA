const counting = (arr) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);

    for(let i = 0; i < arr.length; ++i){
        ++count[arr[i] - min];
    }

    const res= [];
    for(let i = 0; i < count.length; ++i){
        while(count[i]){
            res.push(i + min);
            --count[i];
        }
    }

    return res;
}

console.log(counting([1,2,4,7,1,1,2,3]));