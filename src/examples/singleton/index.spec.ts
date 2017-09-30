import * as test from "tape";

import IBackOffice from "./back-office";
import container from "./container";
import "./index";
import IShopper from "./shopper";

test("the basket should be the same across all instances", (t) => {
  t.plan(1);

  const actual = container.execute(["shopper", "backOffice"], (shopper: IShopper, backOffice: IBackOffice) => {
    shopper.addCheeseToBasket();
    shopper.addCheeseToBasket();
    shopper.addCheeseToBasket();
    return backOffice.calculateTotalPrice();
  });

  t.equal(actual, 15);
});
