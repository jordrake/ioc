import container from "./container";

import IBasket from "./basket";

export default interface IBackOffice {
  calculateTotalPrice(): number;
}

const PRICES: { [item: string]: number } = {
  cheese: 5,
};

container.registerClass("backOffice", ["basket"], class BackOffice implements IBackOffice {
  private basket: IBasket;

  constructor(basket: IBasket) {
    this.basket = basket;
  }

  public calculateTotalPrice() {
    return Object.entries(this.basket.getBasket())
      .map(([item, amount]) => PRICES[item] * amount)
      .reduce((a, b) => a + b);
  }
});
