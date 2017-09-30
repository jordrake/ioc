import * as test from "tape";

import addFactory from "./add";

test("basic example add correctly adds two numbers together", (t) => {
  t.plan(3);

  const add = addFactory();

  t.equal(add(2, 2), 4);
  t.equal(add(5, 0), 5);
  t.equal(add(7, -7), 0);
});
