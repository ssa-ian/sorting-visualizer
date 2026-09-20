const numbers = []
const ol = []

for (let i = 0; i < 100; i++){
    ol.push(i+1)
}

function sleep(ms){
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

const initLen = ol.length

for (let i = 0; i < initLen; i ++){
    numbers[i] = ol.splice(Math.floor(Math.random() * ol.length), 1)[0]
}

const columnContainer = document.getElementById("columnsContainer")

function visualizeArray (array, id = -1){
    columnContainer.replaceChildren()

    array.forEach(i => {
        const newDiv = document.createElement("div")

    newDiv.style.display = "flex"
    newDiv.style.flexDirection = "column"
    newDiv.style.justifyContent = "end"
    newDiv.style.flex = 1

    const tallBar = document.createElement("div")

    tallBar.style.backgroundColor = (i == id)?"#12FC00" : "black"
    tallBar.style.flex = i / Math.max(...array)

    newDiv.appendChild(tallBar)

    columnContainer.appendChild(newDiv)
    });
}

async function bubbleSort(numbers){
    let sorted = false;
    let unsortedLength = numbers.length

    while(!sorted){
    sorted = true
    for(let i = 0; i< unsortedLength - 1; i++){
    if(numbers[i] > numbers[i+1]){
        sorted = false
        const temp = numbers[i]
        numbers[i] = numbers[i+1]
        numbers[i+1] = temp
        visualizeArray(numbers, i)
        await sleep(0.01)
    }}
    unsortedLength--
}
visualizeArray(numbers)
}


visualizeArray(numbers)

document.getElementById("startBtn").onclick = () => btnClick()

function btnClick(){
    bubbleSort(numbers)
}

