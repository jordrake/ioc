"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
const PRICES = {
    cheese: 5,
};
container_1.default.registerClass("backOffice", ["basket"], class BackOffice {
    constructor(basket) {
        this.basket = basket;
    }
    calculateTotalPrice() {
        return Object.entries(this.basket.getBasket())
            .map(([item, amount]) => PRICES[item] * amount)
            .reduce((a, b) => a + b);
    }
});
