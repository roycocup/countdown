
function timeFrom(node){
    let target = new Date('2021-05-12')
    let now = new Date()
    let diff = (target - now)
    let days = Math.round(diff/(1000*60*60*24));
    let hours = Math.round(diff/(1000*60*60));
    let minutes = Math.round(diff/(1000*60));
    let seconds = Math.round(diff/1000);
    
    
    node.innerHTML = seconds.toString()
    document.getElementById('timer').appendChild(node)
}
let node = document.createElement('div')
setInterval(function(){timeFrom(node)}, 1000)


