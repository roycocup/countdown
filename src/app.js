"use strict";
exports.__esModule = true;
var Engine_1 = require("../libs/Engine");
var Clock_1 = require("../libs/Clock");
var clock_el = document.getElementById('timer');
var engine = new Engine_1["default"]([new Clock_1["default"](clock_el)]);
engine.run();
