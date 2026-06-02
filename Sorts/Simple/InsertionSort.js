const insertion = (arr, compareFn) => {
    for(let i = 1; i < arr.length; ++i){
        for(let j = i; j > 0; --j){
            if(compareFn(arr[j - 1], arr[j]) > 0){
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            }
        }
    }
}

const arr = [3, 90, -5, 7, 89, 2, -9];
insertion(arr, (a, b) => b - a);
console.log(arr);
