const countingCommulative = (arr) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    
    for(let i = 0; i < arr.length; ++i){
        ++count[arr[i] - min];
    }

    for(let i = 1; i < count.length; ++i){
        count[i] += count[i - 1];
    }

    const res = new Array(arr.length);
    for(let i = arr.length - 1; i >= 0; --i){
        let idx = count[arr[i] - min]--;
        res[idx - 1] = arr[i];
    }
    return res;
}

const arr = [3,7,5,6,6,7,4,7];
const sorted = countingCommulative(arr);
console.log(sorted);