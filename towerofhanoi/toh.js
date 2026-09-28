towerA = document.getElementById("a");
towerB = document.getElementById("b");
towerC = document.getElementById("c");

let run = false

const disksOfA = [];
const disksOfB = [];
const disksOfC = [];

const colors = ["red", "green", "blue"]

let max

function generateDisks(top = 5){
    for(let i = 0; i < top; i++){
        const disk = {
            length : top-i,
            color : colors[i%3]
        }
        disksOfA.push(disk)
    }
    max = Math.max(...disksOfA.map(d => d.length))
}


generateDisks()

function drawTowers(){
    towerA.replaceChildren()
    towerB.replaceChildren()
    towerC.replaceChildren()
    for (const tower of [towerA, towerB, towerC]){
        const emptyDisk = document.createElement("div")
        emptyDisk.className = "disk"
        tower.appendChild(emptyDisk)
    }

    for (let i = 0; i < disksOfA.length; i++){
        const disk = document.createElement("div");
        disk.classList.add("disk");
        disk.style.width = disksOfA[i].length / max * 190 + "px";
        disk.style.backgroundColor = disksOfA[i].color;
        towerA.appendChild(disk);
    }
    for (let i = 0; i < disksOfB.length; i++){
        const disk = document.createElement("div");
        disk.classList.add("disk");
disk.style.width = disksOfB[i].length / max * 190 + "px";
        disk.style.backgroundColor = disksOfB[i].color;
        towerB.appendChild(disk);
    }
    for (let i = 0; i < disksOfC.length; i++){
        const disk = document.createElement("div");
        disk.classList.add("disk");
disk.style.width = disksOfC[i].length / max * 190 + "px";
        disk.style.backgroundColor = disksOfC[i].color;
        towerC.appendChild(disk);
    }
}

const sleep = time => new Promise( (resolve) => {setTimeout(resolve , time)})

async function hanoi(n, source, target, auxiliary) {
    if (n === 0 || !run) {
        
        return;
    }
    await hanoi (n-1, source, auxiliary, target)
    const disk = source.pop();
    target.push(disk);
    drawTowers()
    await sleep(50)
    await hanoi(n-1, auxiliary, target, source)
}


drawTowers();



async function start(){
    run = !run
    if(run){
        document.getElementById("startBtn").textContent = "Stop"
    }else{
        document.getElementById("startBtn").textContent = "Start"
    }
    await hanoi(disksOfA.length, disksOfA, disksOfC, disksOfB)
}

function reset(){
    run = false
    disksOfA.length = 0
    disksOfB.length = 0
    if(run){
        document.getElementById("startBtn").textContent = "Stop"
    }else{
        document.getElementById("startBtn").textContent = "Start"
    }
    disksOfC.length = 0
    try{
        const setLength = parseInt(document.getElementById("length").value)
        generateDisks(setLength)
    }catch{
        generateDisks()
    }
    
    drawTowers()
}