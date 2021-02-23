
enum Units {
    Days = 1,
    Hours,
    Minutes,
    Seconds
}

function timeFrom(nodes: Element[]){
    let target = new Date('2021-05-12')
    let now = new Date()
    let diff = (target - now)
    let days = getNumUnits(diff, Units.Days)
    let hours = getNumUnits(diff, Units.Hours)
    let minutes = getNumUnits(diff, Units.Minutes)
    let seconds = getNumUnits(diff, Units.Seconds)
    data = {'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds}
    
    for(node in nodes){
        node.innerHTML = seconds.toString()
        document.getElementById('timer').appendChild(node)
    } 
}

function getNumUnits(diff: number, units: Units) {
    switch(units){
        case Units.Seconds:
            return Math.round(diff / (1000))
        case Units.Minutes:
            return Math.round(diff / (1000 * 60))
        case Units.Hours:
            return Math.round(diff / (1000 * 60 * 60))
        case Units.Days:
            return Math.round(diff / (1000 * 60 * 60 * 24));    
    }
}

function draw(){
    
}



let node = document.createElement('div')
setInterval(()=>{timeFrom(node)}, 1000)
