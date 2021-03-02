import {Units} from '../libs/Units'

export function timeFrom(): any {
    let target = new Date('2021-05-12')
    let now = new Date()
    let diff = (target - now)
    let days = getNumUnits(diff, Units.Days)
    let hours = getNumUnits(diff, Units.Hours)
    let minutes = getNumUnits(diff, Units.Minutes)
    let seconds = getNumUnits(diff, Units.Seconds)
    return {'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds}
}

export function getNumUnits(diff: number, units: Units) {
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