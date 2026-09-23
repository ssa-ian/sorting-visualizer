let run = true
let stoppedRunning = false;

const createNumbers = function(length){
    const ar = []
    const nr = []
    for (let i = 0; i < length; i++){
        ar.push(i+1)
    }
    for (let i = 0; i < length; i++){
        nr.push(ar.splice(Math.floor(Math.random() * ar.length), 1)[0])
    }
    return nr;
}




function sleep(ms){
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}


const columnContainer = document.getElementById("columnsContainer")

function visualizeArray (array, greenID = -1, redID = -1){
    columnContainer.replaceChildren()

    for(let i = 0; i<array.length; i++){
    const newDiv = document.createElement("div")

    newDiv.style.display = "flex"
    newDiv.style.flexDirection = "column"
    newDiv.style.justifyContent = "end"
    newDiv.style.flex = 1

    const tallBar = document.createElement("div")

    tallBar.style.backgroundColor = (i == greenID)?"#12FC00" : (i == redID) ? "red" : "black"
    tallBar.style.flex = array[i] / Math.max(...array)

    newDiv.appendChild(tallBar)

    columnContainer.appendChild(newDiv)
    };
}

let arrayToSort = createNumbers(100)
visualizeArray(arrayToSort)

async function mergeSort (numbers, waitTime, left, right, middle){

    if(left >= right || !run){
        return
    }
    
    await mergeSort(numbers,waitTime, left, middle-1,left + Math.floor((middle-left)/2))
    await mergeSort(numbers,waitTime, middle, right, middle + Math.floor((right-middle+1)/2))
    await merge(numbers, waitTime, left, right, middle)
    
}

async function merge(numbers, waitTime, left, right, middle){
    const newArr = []
    let i = left
    let j = middle
    while(i < middle && j <= right){
        if(numbers[i] > numbers[j]){
            newArr.push(numbers[j])
            j++ 
        }else{
            newArr.push(numbers[i])
            i++
        }
        await sleep(waitTime)
        let numCopy = [...numbers]
        numCopy.splice(left, i+j-left-middle, ...newArr)
        visualizeArray(numCopy)
    }
    while(i < middle){
        newArr.push(numbers[i])
        i++
    }
    while(j <= right){
        newArr.push(numbers[j])
        j++
    }
    for(let n = left; n <= right; n++){
        numbers[n] = newArr[n-left]
    }
    visualizeArray(numbers)
}

async function mergeSortContainer(numbers, waitTime){
    mergeSort(numbers, waitTime, 0, numbers.length-1, Math.floor(numbers.length/2)).then(() =>{
        visualizeArray(numbers)
    })
}

async function bubbleSort(numbers, waitTime){
    let sorted = false;
    let unsortedLength = numbers.length

    while(!sorted){
    if(!run){
        break
    }
    sorted = true
    for(let i = 0; i< unsortedLength - 1; i++){
    if(!run){
        break
    }   
    if(numbers[i] > numbers[i+1]){
        sorted = false
        const temp = numbers[i]
        numbers[i] = numbers[i+1]
        numbers[i+1] = temp
        visualizeArray(numbers, i+1)
    }else{
        visualizeArray(numbers,-1, i+1)
    }

await sleep(waitTime)
}
    unsortedLength--
}

visualizeArray(numbers)
}

async function animatedQuickSort(numbers, min, max,speed){
    if(!run){
        return;
    }
    if(min >= max - 1){
        return;
    }
    const left = []
    const right = []
    const pivotIndex = min + Math.floor((max-min) * Math.random())
    const pivot = numbers[pivotIndex]
    for(let i = min; i < max; i++){
        if(numbers[i] == pivot) continue
        if(numbers[i] < pivot){
            left.push(numbers[i])
        }else{
            right.push(numbers[i])
        }
        const nums = [...numbers]   
        nums.splice(min, left.length + right.length + 1, ...left, pivot,...right)
        if(i === max-1){
            visualizeArray(nums, min + left.length)
        }else{
            visualizeArray(nums)
        }
        
        await sleep(speed)
    }
    let k = min
    for(let i = 0; i < left.length; i++){
        numbers[k] = left[i]
        k++
    }

    const newPivotIndex = k
    numbers[k++] = pivot

    for(const i of right){
        numbers[k++] = i
    }

    await animatedQuickSort(numbers, min, newPivotIndex)
    await animatedQuickSort(numbers, newPivotIndex+1, max)
    

}

function functionalQuickSort(numbers){
    if(numbers.length <2){
        return numbers;
    }
    const left = []
    const right = []
    const pivotIndex = Math.floor(Math.random() * numbers.length)
    for(let i = 0; i < numbers.length; i++){
        if(i !== pivotIndex){
            if(numbers[i] < numbers[pivotIndex]){
                left.push(numbers[i])
            }else{
                right.push(numbers[i])
            }
        }
    }

    return combine( quickSort(left), numbers[pivotIndex],  quickSort(right))
}

function combine(l, p, r){
    newArr = []
    for(let i = 0; i < l.length; i++){
        newArr.push(l[i])
    }
    newArr.push(p)
    for(let i = 0; i < r.length; i++){
        newArr.push(r[i])
    }

    return newArr
}

async function btnClick(){
    run = !run
    document.getElementById("startBtn").textContent = (!run) ? "Start" : "Stop" 
    let speed = 0.1
    try{
        speed = document.getElementById("speed").value 
    }catch(error){
        alert("Problem with getting speed")
    }
    const c = document.getElementById("selection").value
    if(c === "bubble"){
        bubbleSort(arrayToSort, speed)
    }else if(c === "merge"){
        mergeSortContainer(arrayToSort, speed)
    }else if(c === "quick"){
        await animatedQuickSort(arrayToSort, 0, arrayToSort.length, speed)
        visualizeArray(arrayToSort)
    }
    
}

document.getElementById("generateBtn").onclick = () => {
    run = false
    document.getElementById("startBtn").textContent = (!run) ? "Start" : "Stop" 
    let length
    try{
        length = parseInt(document.getElementById("length").value)
    }catch(err){

    }
    if(!length){
        arrayToSort = createNumbers(100)
    }else{
        arrayToSort = createNumbers(length)
    }

    
    visualizeArray(arrayToSort)
}

