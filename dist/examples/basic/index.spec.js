"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("tape");
const container_1 = require("./container");
require("./index");
test("basic calculator example should calculate a number", (t) => {
    t.plan(1);
    t.equal(container_1.default.execute(["calculator"], (calculator) => calculator.doSomeMath(40)), 67);
});
