const bubble = (arr,compareFn) => {
    for(let i = 0; i < arr.length - 1; ++i){
        let swapped = false;
        for(let j = 0; j < arr.length - i - 1; ++j){
            if(compareFn(arr[j], arr[j + 1]) > 0){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if(!swapped) break;
    }
}

const arr = [3, 90, -5, 7, 89, 2, -9];
bubble(arr, (a, b) => a - b);
console.log(arr);