function timeFrom(node) {
    var target = new Date('2021-05-12');
    var now = new Date();
    var diff = (target - now);
    var days = Math.round(diff / (1000 * 60 * 60 * 24));
    var hours = Math.round(diff / (1000 * 60 * 60));
    var minutes = Math.round(diff / (1000 * 60));
    var seconds = Math.round(diff / 1000);
    node.innerHTML = seconds.toString();
    document.getElementById('timer').appendChild(node);
}
var node = document.createElement('div');
setInterval(function () { timeFrom(node); }, 1000);
