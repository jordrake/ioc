import * as sinon from "sinon";
import * as test from "tape";

import Calculator from "./calculator";

test("basic calculator example should call add and subtract", (t) => {
  t.plan(2);

  const addSpy = sinon.spy();
  const subtractSpy = sinon.spy();

  const calculator = new Calculator(addSpy, subtractSpy);
  calculator.doSomeMath();

  t.true(addSpy.calledTwice);
  t.true(subtractSpy.calledOnce);
});
