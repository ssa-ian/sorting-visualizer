async function insertNode(root, value){
    if(root === null){
        return {
            left : null,
            right : null,
            value : value
        }
    }
    else if(value <= root.value){
        root.left = await insertNode(root.left, value)
        return root
    }else if(value > root.value){
        root.right = await insertNode(root.right, value)
        return root
    }
}

async function visualizeTree(root){
    graph = []
    graph.push([root])
    let rowEmpty = false
    let a = 0
    while(!rowEmpty){
        let newRow = []
        for(let i = 0; i < graph[a].length; i++){
            let cleft = null; let cright = null
            try{
                cleft = graph[a][i].left
            }catch{
                cleft = null
            }   
            try{ cright = graph[a][i].right}catch{
                cright = null
            }
            if(!!cleft || !!cright){
                rowEmpty = false
            }
            newRow.push(cleft, cright)
        }
        let testBreak = false
        for(item of newRow){
            if(!!item){
                testBreak = true
            }
        }
        if(testBreak) graph.push(newRow)
        else{
            rowEmpty = true
        }
        a++
    }
    

    for(let i = 0; i < graph.length; i++){
        const newRow = document.createElement("div")
        newRow.classList.add("rows")
        
        for(let j = 0; j < graph[i].length; j++){
            const newCenter = document.createElement("div")
            newCenter.classList.add("centeredrow")
            const circle = document.createElement("div")
            
            if(graph[i][j] != null){
                circle.classList.add("circle")
                circle.innerText = graph[i][j].value
            }
            
            newCenter.appendChild(circle)
            newRow.appendChild(newCenter)
        }

        document.getElementById("tree").appendChild(newRow)
    }
}

let initRoot = null

const insert = async function(){
    initRoot = await insertNode(initRoot, parseInt(document.getElementById("newNode").value))
    document.getElementById("tree").replaceChildren()
    await visualizeTree(initRoot)
}