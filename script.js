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

document.getElementById("startBtn").onclick = () => btnClick()

function btnClick(){
    run = !run
    document.getElementById("startBtn").textContent = (!run) ? "Start" : "Stop" 
    let speed = 0.1
    try{
        speed = document.getElementById("speed").value 
    }catch(error){
        alert("Problem with getting speed")
    }
    bubbleSort(arrayToSort, speed)
}

document.getElementById("generateBtn").onclick = () => {
    run = false
    arrayToSort = createNumbers(parseInt(document.getElementById("length").value))
    visualizeArray(arrayToSort)
}

