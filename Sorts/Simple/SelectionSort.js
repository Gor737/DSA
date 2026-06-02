const selection = (arr, compareFn) => {
    for(let i = 0; i < arr.length; ++i){
        let minIdx = i;
        for(let j = i + 1; j < arr.length; ++j){
            if(compareFn(arr[minIdx], arr[j]) > 0){
                minIdx = j;
            }
        }
        [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]];
    }
}

const arr = [3, 90, -5, 7, 89, 2, -9];
selection(arr, (a, b) => a - b);
console.log(arr);