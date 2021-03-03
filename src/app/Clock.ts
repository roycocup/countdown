import Component from '../libs/Component'

export default class Clock extends Component{
    i: number = 0
    
    update(){
        this.i++
        this.targetElement.innerHTML = String(this.i)
    }
}