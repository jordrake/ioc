"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
container_1.default.registerClass("shopper", ["basket"], class Shopper {
    constructor(basket) {
        this.basket = basket;
    }
    addCheeseToBasket() {
        this.basket.add("cheese");
    }
});
