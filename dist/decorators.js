"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Injectable(container, name, dependencies = []) {
    return (target) => container.registerClass(name, dependencies, target);
}
exports.default = Injectable;
