import * as test from "tape";

import Container from "../../container";

import ArbitraryClassThatUsesSorter from "./index";
import RegularSorter from "./regular-sorter";
import ReverseSorter from "./reverse-sorter";

test("substition example should sort alphabetically if regular sorter is provided", (t) => {
  t.plan(1);

  const container = new Container();
  container.registerClass("sorter", [], RegularSorter);
  container.registerClass("arby", ["sorter"], ArbitraryClassThatUsesSorter);
  const actual = container.execute(["arby"], (arby: ArbitraryClassThatUsesSorter) => {
    return arby.sort(["hello", "my", "name", "is", "jordan"]);
  });

  t.deepEqual(actual, ["hello", "is", "jordan", "my", "name"]);
});

test("substition example should sort reverse alphabetically if reverse sorter is provided", (t) => {
  t.plan(1);

  const container = new Container();
  container.registerClass("sorter", [], ReverseSorter);
  container.registerClass("arby", ["sorter"], ArbitraryClassThatUsesSorter);
  const actual = container.execute(["arby"], (arby: ArbitraryClassThatUsesSorter) => {
    return arby.sort(["hello", "my", "name", "is", "jordan"]);
  });

  t.deepEqual(actual, ["name", "my", "jordan", "is", "hello"]);
});
