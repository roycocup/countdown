
enum Units {
    Days = 1,
    Hours,
    Minutes,
    Seconds
}

function timeFrom(): any {
    let target = new Date('2021-05-12')
    let now = new Date()
    let diff = (target - now)
    let days = getNumUnits(diff, Units.Days)
    let hours = getNumUnits(diff, Units.Hours)
    let minutes = getNumUnits(diff, Units.Minutes)
    let seconds = getNumUnits(diff, Units.Seconds)
    return {'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds}
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

class Component {
    targetElement: HTMLElement;
    constructor(targetElement: HTMLElement){
        this.targetElement = targetElement
    }
    update(){}
    draw(){}
}

class Engine {
    
    components: Component[];

    constructor(components: Component[]){
        this.components = components
    }

    run(){
        setInterval(()=>{
            this.update()
        }, 1000)
    }

    update(){
        this.components.forEach(component => {
            component.update();
        });
    }
}

class Clock extends Component{
    update(){
        console.log('Clock...');
    }
}

class Dots extends Component{
    update(){
        console.log('Dots...');
    }
}



var payload: Component[] = [new Clock(), new Dots()];
let engine = new Engine(payload)
// engine.run()



