var Units;
(function (Units) {
    Units[Units["Days"] = 1] = "Days";
    Units[Units["Hours"] = 2] = "Hours";
    Units[Units["Minutes"] = 3] = "Minutes";
    Units[Units["Seconds"] = 4] = "Seconds";
})(Units || (Units = {}));
function timeFrom(nodes) {
    var target = new Date('2021-05-12');
    var now = new Date();
    var diff = (target - now);
    var days = getNumUnits(diff, Units.Days);
    var hours = getNumUnits(diff, Units.Hours);
    var minutes = getNumUnits(diff, Units.Minutes);
    var seconds = getNumUnits(diff, Units.Seconds);
    data = { 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
    for (node in nodes) {
        node.innerHTML = seconds.toString();
        document.getElementById('timer').appendChild(node);
    }
}
function getNumUnits(diff, units) {
    switch (units) {
        case Units.Seconds:
            return Math.round(diff / (1000));
        case Units.Minutes:
            return Math.round(diff / (1000 * 60));
        case Units.Hours:
            return Math.round(diff / (1000 * 60 * 60));
        case Units.Days:
            return Math.round(diff / (1000 * 60 * 60 * 24));
    }
}
function draw() {
}
var node = document.createElement('div');
setInterval(function () { timeFrom(node); }, 1000);
