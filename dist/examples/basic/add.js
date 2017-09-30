"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
container_1.default.registerFactory("add", [], () => {
    return (a, b) => a + b;
});
