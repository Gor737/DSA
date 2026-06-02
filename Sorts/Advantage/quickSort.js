const lowQuick = (arr, low, high) => {
    const pivot = arr[low];
    let i = high + 1;
    for(let j = high; j > low; --j){
        if(pivot < arr[j]){
            --i;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i - 1], arr[low]] = [arr[low], arr[i - 1]];
    return i - 1;
}

const highQuick = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for(let j = low; j < high; ++j){
        if(pivot > arr[j]){
            ++i;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i+1], arr[high]]= [arr[high], arr[i+1]]
    return i + 1; 
}

const medianQuick = (arr, low, high) => {
    const mid = Math.floor((high - low) / 2) + low;
    [arr[low], arr[mid]] = [arr[mid], arr[low]];
    const pivot = arr[low];

    let i = high + 1;
    for(let j = high; j > low; --j){
        if(pivot < arr[j]){
            --i;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i-1], arr[low]] = [arr[low], arr[i-1]];
    return i - 1;
}

const randomQuick = (arr, low, high) => {
    const random = Math.floor(Math.random() * low + low);
    [arr[low], arr[random]] = [arr[random], arr[low]];
    const pivot = arr[low];

    let i = high + 1;
    for(let j = high; j > low; --j){
        if(pivot < arr[j]){
            --i;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i - 1], arr[low]] = [arr[low], arr[i - 1]];
    return i - 1;
}


const quickSort = (arr, low = 0, high = arr.length - 1) => {
    if(low >= high) return;
    const pivot = randomQuick(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
}

const arr = [23, 5, 542, 0, 7, -32, 22];
quickSort(arr);
console.log(arr);