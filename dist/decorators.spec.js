"use strict";
/* tslint:disable:max-classes-per-file */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("tape");
const container_1 = require("./container");
const decorators_1 = require("./decorators");
test("injectable should register the class in the container", (t) => {
    t.plan(1);
    const container = new container_1.default();
    let HelloWorld = class HelloWorld {
        sayHello() {
            return "Hello, World!";
        }
    };
    HelloWorld = __decorate([
        decorators_1.default(container, "HelloWorld", [])
    ], HelloWorld);
    t.equal(container.get("HelloWorld").sayHello(), "Hello, World!");
});
test("injectable should inject the specified dependencies into the class constructor", (t) => {
    t.plan(1);
    const container = new container_1.default();
    container.register("name", "Jordan");
    let Hello = class Hello {
        constructor(name) {
            this.name = name;
        }
        sayHello() {
            return `Hello, ${this.name}!`;
        }
    };
    Hello = __decorate([
        decorators_1.default(container, "Hello", ["name"])
    ], Hello);
    t.equal(container.get("Hello").sayHello(), "Hello, Jordan!");
});
test("injectable should return the class for testing purposes", (t) => {
    t.plan(1);
    const container = new container_1.default();
    class Stubby {
    }
    t.equal(decorators_1.default(container, "Stubby")(Stubby), Stubby);
});
