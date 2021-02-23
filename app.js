var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Units;
(function (Units) {
    Units[Units["Days"] = 1] = "Days";
    Units[Units["Hours"] = 2] = "Hours";
    Units[Units["Minutes"] = 3] = "Minutes";
    Units[Units["Seconds"] = 4] = "Seconds";
})(Units || (Units = {}));
function timeFrom() {
    var target = new Date('2021-05-12');
    var now = new Date();
    var diff = (target - now);
    var days = getNumUnits(diff, Units.Days);
    var hours = getNumUnits(diff, Units.Hours);
    var minutes = getNumUnits(diff, Units.Minutes);
    var seconds = getNumUnits(diff, Units.Seconds);
    return { 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds };
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
var Component = /** @class */ (function () {
    function Component(targetElement) {
        this.targetElement = targetElement;
    }
    Component.prototype.update = function () { };
    Component.prototype.draw = function () { };
    return Component;
}());
var Engine = /** @class */ (function () {
    function Engine(components) {
        this.components = components;
    }
    Engine.prototype.run = function () {
        var _this = this;
        setInterval(function () {
            _this.update();
        }, 1000);
    };
    Engine.prototype.update = function () {
        this.components.forEach(function (component) {
            component.update();
        });
    };
    return Engine;
}());
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Clock.prototype.update = function () {
        console.log('Clock...');
    };
    return Clock;
}(Component));
var Dots = /** @class */ (function (_super) {
    __extends(Dots, _super);
    function Dots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dots.prototype.update = function () {
        console.log('Dots...');
    };
    return Dots;
}(Component));
var payload = [new Clock(), new Dots()];
var engine = new Engine(payload);
// engine.run()
