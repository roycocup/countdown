enum Units {
    Days = 1,
    Hours,
    Minutes,
    Seconds,
    Months
}

class DatesEngine {
    to: Date
    constructor(to: Date){
        this.to = to
    }

    getNumUnits(diff: number, units: Units) {
        switch(units){
            case Units.Seconds:
                return diff / (1000)
            case Units.Minutes:
                return diff / (1000 * 60)
            case Units.Hours:
                return diff / (1000 * 60 * 60)
            case Units.Days:
                return diff / (1000 * 60 * 60 * 24)
            case Units.Months:
                return diff / (1000 * 60 * 60 * 24 * 30);
        }
    }

    timeFrom() {
        let now: Date = new Date()
        let diff = (this.to - now)
        let days = this.getNumUnits(diff, Units.Days)
        let months = this.getNumUnits(diff, Units.Months)
        let hours = this.getNumUnits(diff, Units.Hours)
        let minutes = this.getNumUnits(diff, Units.Minutes)
        let seconds = this.getNumUnits(diff, Units.Seconds)
        return {'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds, 'months':months}
    }

    // formatted timer
    // timer - x months | y days | h hours | y minutes 
    fullClock(){
        let times = this.timeFrom()
        // get months up to integer
        let months_left = Number(times.months.toString().split('.')[0])
        let remainder_month = times.months - months_left
        
        // get remainer from months and make that into days
        let remainder_month_in_days = (remainder_month * 30)
        let days_left = Number(remainder_month_in_days.toString().split('.')[0])

        // Hours left
        let remainder_days_in_hours = ((remainder_month_in_days - days_left) * 24)
        let hours_left = Number(remainder_days_in_hours.toString().split('.')[0])

        // get remainder of 24 hours and make that minutes
        let remainder_hours_in_minutes = ((remainder_days_in_hours - hours_left) * 60)
        let minutes_left = Number(remainder_hours_in_minutes.toString().split('.')[0])

        // get remainder of 60 minutes and make that seconds
        let remainder_minutes_in_seconds = ((remainder_hours_in_minutes - minutes_left) * 60)
        let seconds_left = Number(remainder_minutes_in_seconds.toString().split('.')[0])
        
        return {
            'months_left': months_left,
            'remainder_month_in_days': remainder_month_in_days,
            'days_left': days_left,
            'remainder_days_in_hours': remainder_days_in_hours,
            'hours_left': hours_left,
            'remainder_hours_in_minutes': remainder_hours_in_minutes,
            'minutes_left': minutes_left,
            'remainder_minutes_in_seconds': remainder_minutes_in_seconds,
            'seconds_left': seconds_left,
        }
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

class Clock extends Component {
    
    update(){
        const to: Date = new Date('2021-05-12')
        const dateEngine: DatesEngine = new DatesEngine(to)
        
        const fullTimes = dateEngine.fullClock()
        let clock = 
            "<td>" + fullTimes.months_left 
            + "</td><td>" + fullTimes.days_left 
            + "</td><td>" + fullTimes.hours_left 
            + "</td><td>" + fullTimes.minutes_left 
            + "</td><td>" + fullTimes.seconds_left 
            + "</td>"
        
        this.targetElement.innerHTML = clock
    }
}


class Dots extends Component {
    
    update(){
        const to: Date = new Date('2021-05-12')
        const dateEngine: DatesEngine = new DatesEngine(to)
        
        const fullTimes = dateEngine.timeFrom()
        let dots = Array(Math.round(fullTimes.days))
        let el = dots.join(" . ")
        
        this.targetElement.innerHTML = el
    }
}



var clock: Component = new Clock(document.getElementById('timer'))
var dots: Component = new Dots(document.getElementById('dots'))
var payload: Component[] = [clock, dots];
let engine = new Engine(payload)
engine.run()



