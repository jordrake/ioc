import container from "./container";

import IBasket from "./basket";

export default interface IShopper {
  addCheeseToBasket(): void;
}

container.registerClass("shopper", ["basket"], class Shopper implements IShopper {
  private basket: IBasket;

  constructor(basket: IBasket) {
    this.basket = basket;
  }

  public addCheeseToBasket() {
    this.basket.add("cheese");
  }
});
