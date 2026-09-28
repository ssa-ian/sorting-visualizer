const arrayStack = [];
const arrayQueue = [];

const types = Object.freeze({
    STACK: 'stack',
    QUEUE: 'queue'
})

for (let i = 0; i < 10 ; i++){
    arrayStack.push(Math.floor(Math.random() * 20))
    arrayQueue.push(Math.floor(Math.random() * 20))
}

function visualizeArray(array, type, highlight = -1, highlightRed = -1){
    if(type === types.STACK){
        document.getElementById('stackContainer').replaceChildren()
    } else if(type === types.QUEUE){
        document.getElementById('queueContainer').replaceChildren()
    }

    array.forEach((value, index) => {
    const element = document.createElement('div')
    element.classList.add('element')
    if (index === 0){
        element.classList.add('first')
    }
    if(index === highlight){
        element.classList.add('highlight')
    }
    if(index === highlightRed){
        element.classList.add('highlightRed')
    }
    const valueDiv = document.createElement('div')
    valueDiv.classList.add('elementChild')
    valueDiv.style.flex    = "1"
    valueDiv.style.width = "100%"
    valueDiv.appendChild(document.createTextNode(value))
    const indexDiv = document.createElement('div')
    element.appendChild(valueDiv)
    if (type === types.STACK) {
        document.getElementById('stackContainer').appendChild(element)
    } else if (type === types.QUEUE) {
        document.getElementById('queueContainer').appendChild(element)
    }
}
)
}

function push(){
    arrayStack.push(document.getElementById('pushInput').value)

    visualizeArray(arrayStack, types.STACK, arrayStack.length - 1)
}

function pop(){
    visualizeArray(arrayStack, types.STACK, -1, arrayStack.length - 1)
    arrayStack.pop()
    
    setTimeout(() => {
        document.getElementById('stackContainer').replaceChildren()
        visualizeArray(arrayStack, types.STACK)
    }, 500)
}

function enqueue(){
    arrayQueue.push(document.getElementById('enqueueInput').value)
    visualizeArray(arrayQueue, types.QUEUE, arrayQueue.length - 1)
}

function dequeue(){
    visualizeArray(arrayQueue, types.QUEUE, -1,  0)
    arrayQueue.shift()
    setTimeout(() => {
    document.getElementById('queueContainer').replaceChildren()
    
    visualizeArray(arrayQueue, types.QUEUE)}, 500)
}
visualizeArray(arrayStack, types.STACK)
visualizeArray(arrayQueue, types.QUEUE)




