import * as test from "tape";

import container from "./container";
import "./index";

test("basic calculator example should calculate a number when called from container", (t) => {
  t.plan(1);

  t.equal(container.execute(["calculator"], (calculator) => calculator.doSomeMath(40)), 67);
});
