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

function visualizeArray(array, type){
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
    arrayStack.push(Math.floor(Math.random() * 20))
    
    visualizeArray(arrayStack, types.STACK)
}

function pop(){
    arrayStack.pop()
    document.getElementById('stackContainer').replaceChildren()
    visualizeArray(arrayStack, types.STACK)
}

function enqueue(){
    arrayQueue.push(Math.floor(Math.random() * 20))
    visualizeArray(arrayQueue, types.QUEUE)
}

function dequeue(){
    arrayQueue.shift()
    document.getElementById('queueContainer').replaceChildren()
    visualizeArray(arrayQueue, types.QUEUE)
}
visualizeArray(arrayStack, types.STACK)
visualizeArray(arrayQueue, types.QUEUE)




