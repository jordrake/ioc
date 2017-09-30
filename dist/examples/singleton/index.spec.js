"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("tape");
const container_1 = require("./container");
require("./index");
test("the basket should be the same across all instances", (t) => {
    t.plan(1);
    const actual = container_1.default.execute(["shopper", "backOffice"], (shopper, backOffice) => {
        shopper.addCheeseToBasket();
        shopper.addCheeseToBasket();
        shopper.addCheeseToBasket();
        return backOffice.calculateTotalPrice();
    });
    t.equal(actual, 15);
});
