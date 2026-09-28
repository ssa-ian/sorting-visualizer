const array = [];

const types = Object.freeze({
    STACK: 'stack',
    QUEUE: 'queue'
})

for (let i = 0; i < 10 ; i++){
    array.push(Math.floor(Math.random() * 20))
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
    indexDiv.classList.add('elementChild')
    indexDiv.style.flex = "1"
    indexDiv.style.width = "100%"
    indexDiv.appendChild(document.createTextNode(index))
    element.appendChild(valueDiv)
    element.appendChild(indexDiv)
    if (type === types.STACK) {
        document.getElementById('stackContainer').appendChild(element)
    } else if (type === types.QUEUE) {
        document.getElementById('queueContainer').appendChild(element)
    }
}
)
}

function push(){
    array.push(Math.floor(Math.random() * 20))
    
    visualizeArray(array, types.STACK)
    visualizeArray(array, types.QUEUE)
}

function pop(){
    array.pop()
    document.getElementById('stackContainer').replaceChildren()
    visualizeArray(array, types.STACK)
    visualizeArray(array, types.QUEUE)
}

function enqueue(){
    array.push(Math.floor(Math.random() * 20))
    visualizeArray(array, types.QUEUE)
    visualizeArray(array, types.STACK)
}

function dequeue(){
    array.shift()
    document.getElementById('queueContainer').replaceChildren()
    visualizeArray(array, types.QUEUE)
    visualizeArray(array, types.STACK)
}
visualizeArray(array, types.STACK)
visualizeArray(array, types.QUEUE)




