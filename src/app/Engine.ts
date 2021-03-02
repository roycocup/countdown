import Component from '../libs/Component'

export default class Engine {
    
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
        console.log('sdf')
        this.components.forEach(component => {
            component.update();
        });
    }
}