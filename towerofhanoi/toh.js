towerA = document.getElementById("a");
towerB = document.getElementById("b");
towerC = document.getElementById("c");

const disksOfA = [];
const disksOfB = [];
const disksOfC = [];

const colors = ["red", "green", "blue"]

function generateDisks(){
    for(let i = 0; i < 5; i++){
        const disk = {
            length : 5-i,
            color : colors[Math.floor(Math.random()*3)]
        }
        disksOfA.push(disk)
    }
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
        disk.style.width = disksOfA[i].length * 36 + "px";
        disk.style.backgroundColor = disksOfA[i].color;
        towerA.appendChild(disk);
    }
    for (let i = 0; i < disksOfB.length; i++){
        const disk = document.createElement("div");
        disk.classList.add("disk");
        disk.style.width = disksOfB[i].length * 36 + "px";
        disk.style.backgroundColor = disksOfB[i].color;
        towerB.appendChild(disk);
    }
    for (let i = 0; i < disksOfC.length; i++){
        const disk = document.createElement("div");
        disk.classList.add("disk");
        disk.style.width = disksOfC[i].length * 36 + "px";
        disk.style.backgroundColor = disksOfC[i].color;
        towerC.appendChild(disk);
    }
}

const sleep = time => new Promise( (resolve) => {setTimeout(resolve , time)})

async function hanoi(n, source, target, auxiliary) {
    if (n === 0) {
        
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



function start(){
hanoi(disksOfA.length, disksOfA, disksOfC, disksOfB)
}

function reset(){
    disksOfA.push(...disksOfC)
    disksOfC.length = 0
    drawTowers()
}