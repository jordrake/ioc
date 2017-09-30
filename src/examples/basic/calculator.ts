import container from "./container";

type mathFunction = (a: number, b: number) => number;

export default container.registerClass("calculator", ["add", "subtract"],
  class {
    private add: mathFunction;
    private subtract: mathFunction;

    constructor(add: mathFunction, subtract: mathFunction) {
      this.add = add;
      this.subtract = subtract;
    }

    public doSomeMath(seedValue: number) {
      return this.add(77, this.subtract(40, this.add(10, seedValue)));
    }
  },
);
