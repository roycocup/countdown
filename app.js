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
    Units[Units["Months"] = 5] = "Months";
})(Units || (Units = {}));
var DatesEngine = /** @class */ (function () {
    function DatesEngine(to) {
        this.to = to;
    }
    DatesEngine.prototype.getNumUnits = function (diff, units) {
        switch (units) {
            case Units.Seconds:
                return diff / (1000);
            case Units.Minutes:
                return diff / (1000 * 60);
            case Units.Hours:
                return diff / (1000 * 60 * 60);
            case Units.Days:
                return diff / (1000 * 60 * 60 * 24);
            case Units.Months:
                return diff / (1000 * 60 * 60 * 24 * 30);
        }
    };
    DatesEngine.prototype.timeFrom = function () {
        var now = new Date();
        var diff = (this.to - now);
        var days = this.getNumUnits(diff, Units.Days);
        var months = this.getNumUnits(diff, Units.Months);
        var hours = this.getNumUnits(diff, Units.Hours);
        var minutes = this.getNumUnits(diff, Units.Minutes);
        var seconds = this.getNumUnits(diff, Units.Seconds);
        return { 'days': days, 'hours': hours, 'minutes': minutes, 'seconds': seconds, 'months': months };
    };
    // formatted timer
    // timer - x months | y days | h hours | y minutes 
    DatesEngine.prototype.fullClock = function () {
        var times = this.timeFrom();
        // get months up to integer
        var months_left = Number(times.months.toString().split('.')[0]);
        var remainder_month = times.months - months_left;
        // get remainer from months and make that into days
        var remainder_month_in_days = (remainder_month * 30);
        var days_left = Number(remainder_month_in_days.toString().split('.')[0]);
        // Hours left
        var remainder_days_in_hours = ((remainder_month_in_days - days_left) * 24);
        var hours_left = Number(remainder_days_in_hours.toString().split('.')[0]);
        // get remainder of 24 hours and make that minutes
        var remainder_hours_in_minutes = ((remainder_days_in_hours - hours_left) * 60);
        var minutes_left = Number(remainder_hours_in_minutes.toString().split('.')[0]);
        // get remainder of 60 minutes and make that seconds
        var remainder_minutes_in_seconds = ((remainder_hours_in_minutes - minutes_left) * 60);
        var seconds_left = Number(remainder_minutes_in_seconds.toString().split('.')[0]);
        return {
            'months_left': months_left,
            'remainder_month_in_days': remainder_month_in_days,
            'days_left': days_left,
            'remainder_days_in_hours': remainder_days_in_hours,
            'hours_left': hours_left,
            'remainder_hours_in_minutes': remainder_hours_in_minutes,
            'minutes_left': minutes_left,
            'remainder_minutes_in_seconds': remainder_minutes_in_seconds,
            'seconds_left': seconds_left
        };
    };
    return DatesEngine;
}());
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
        var to = new Date('2021-05-12');
        var dateEngine = new DatesEngine(to);
        var fullTimes = dateEngine.fullClock();
        var clock = "<td>" + fullTimes.months_left
            + "</td><td>" + fullTimes.days_left
            + "</td><td>" + fullTimes.hours_left
            + "</td><td>" + fullTimes.minutes_left
            + "</td><td>" + fullTimes.seconds_left
            + "</td>";
        this.targetElement.innerHTML = clock;
    };
    return Clock;
}(Component));
var Dots = /** @class */ (function (_super) {
    __extends(Dots, _super);
    function Dots() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dots.prototype.update = function () {
        var to = new Date('2021-05-12');
        var dateEngine = new DatesEngine(to);
        var fullTimes = dateEngine.timeFrom();
        var dots = Array(Math.round(fullTimes.days));
        var el = dots.join(" . ");
        this.targetElement.innerHTML = el;
    };
    return Dots;
}(Component));
var clock = new Clock(document.getElementById('timer'));
var dots = new Dots(document.getElementById('dots'));
var payload = [clock, dots];
var engine = new Engine(payload);
engine.run();
