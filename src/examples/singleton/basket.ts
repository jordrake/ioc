import container from "./container";

export default interface IBasket {
  add(item: string): void;
  getBasket(): { [item: string]: number };
}

container.registerClass("basket", [], class Basket implements IBasket {
  private basket: { [item: string]: number };

  constructor() {
    this.basket = {};
  }

  public add(item: string) {
    this.basket[item] = this.basket[item] ? this.basket[item] + 1 :  1;
  }

  public getBasket() {
    return this.basket;
  }
}, { singleton: true });
