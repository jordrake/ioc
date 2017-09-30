"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
container_1.default.registerClass("calculator", ["add", "subtract"], class {
    constructor(add, subtract) {
        this.add = add;
        this.subtract = subtract;
    }
    doSomeMath(seedValue) {
        return this.add(77, this.subtract(40, this.add(10, seedValue)));
    }
});
