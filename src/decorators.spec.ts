/* tslint:disable:max-classes-per-file */

import * as test from "tape";
import Container from "./container";
import Injectable from "./decorators";

test("injectable should register the class in the container", (t) => {
  t.plan(1);

  const container = new Container();

  @Injectable(container, "HelloWorld", [])
  class HelloWorld {
    public sayHello() {
      return "Hello, World!";
    }
  }

  t.equal(container.get("HelloWorld").sayHello(), "Hello, World!");
});

test("injectable should inject the specified dependencies into the class constructor", (t) => {
  t.plan(1);

  const container = new Container();
  container.register("name", "Jordan");

  @Injectable(container, "Hello", ["name"])
  class Hello {
    private name: string;
    constructor(name: string) {
      this.name = name;
    }
    public sayHello() {
      return `Hello, ${this.name}!`;
    }
  }

  t.equal(container.get("Hello").sayHello(), "Hello, Jordan!");
});

test("injectable should return the class for testing purposes", (t) => {
  t.plan(1);

  const container = new Container();
  class Stubby {}

  t.equal(Injectable(container, "Stubby")(Stubby), Stubby);
});
