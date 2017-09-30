"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
container_1.default.registerClass("basket", [], class Basket {
    constructor() {
        this.basket = {};
    }
    add(item) {
        this.basket[item] = this.basket[item] ? this.basket[item] + 1 : 1;
    }
    getBasket() {
        return this.basket;
    }
}, { singleton: true });
