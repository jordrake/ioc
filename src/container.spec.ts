/* tslint:disable:max-classes-per-file */

import * as sinon from "sinon";
import * as test from "tape";

import Container from "./container";

test("get should throw an error if no module has been registered under that name", (t) => {
  t.plan(1);

  const container = new Container();

  t.throws(() => container.get("foo"));
});

test("register should support any type of value", (t) => {
  t.plan(4);

  const container = new Container();
  const num = 10;
  const obj = {};
  const func = () => ({});
  const text = "";

  container.register("number", num);
  container.register("obj", obj);
  container.register("func", func);
  container.register("text", text);

  t.equal(container.get("number"), num);
  t.equal(container.get("obj"), obj);
  t.equal(container.get("func"), func);
  t.equal(container.get("text"), text);
});

test("register should take a value and return it via get", (t) => {
  t.plan(1);

  const container = new Container();
  container.register("foo", "bar");

  t.equal(container.get("foo"), "bar");
});

test("register and get should return the same value every time", (t) => {
  t.plan(1);

  const container = new Container();
  container.register("foo", {});

  t.equal(container.get("foo"), container.get("foo"));
});

test("register should throw an error if an additional register with the same name is attempted", (t) => {
  t.plan(1);

  const container = new Container();
  container.register("foo", "bar");

  t.throws(() => container.register("foo", "qux"));
});

test("register should return the value for testing purposes", (t) => {
  t.plan(1);

  const value = {};
  const container = new Container();
  t.equal(container.register("value", value), value);
});

test("registerFactory and get should return the result of the factory", (t) => {
  t.plan(1);

  const container = new Container();
  container.registerFactory("hello", [], () => "world");

  t.equal(container.get("hello"), "world");
});

test("registerFactory should execute the factory every get", (t) => {
  t.plan(1);

  const spy = sinon.spy();
  const container = new Container();
  container.registerFactory("foo", [], spy);
  container.get("foo");
  container.get("foo");

  t.true(spy.calledTwice);
});

test("registerFactory should execute the factory once and return the same result if singleton option is set", (t) => {
  t.plan(2);

  const stub = sinon.stub().callsFake(() => ({}));
  const container = new Container();
  container.registerFactory("hello", [], stub, { singleton: true });
  const firstGet = container.get("hello");
  const secondGet = container.get("hello");

  t.equal(firstGet, secondGet);
  t.true(stub.calledOnce);
});

test("registerFactory and get should lazily execute the factory", (t) => {
  t.plan(2);

  const spy = sinon.spy();
  const container = new Container();
  container.registerFactory("foo", [], spy);

  t.true(spy.notCalled);

  container.get("foo");

  t.true(spy.calledOnce);
});

test("registerFactory should inject the dependencies and execute on get", (t) => {
  t.plan(1);

  const spy = sinon.spy();
  const container = new Container();
  container.register("name", "Jordan");
  container.registerFactory("hello", ["name"], spy);
  container.get("hello");

  t.true(spy.calledWithExactly("Jordan"));
});

test("registerFactory should return the factory for testing purposes", (t) => {
  t.plan(1);

  const factory = () => ({});
  const container = new Container();
  t.equal(container.registerFactory("factory", [], factory), factory);
});

test("registerClass should return an instance of the class on get", (t) => {
  t.plan(1);

  const StubClass = class { };
  const container = new Container();
  container.registerClass("classy", [], StubClass);

  t.true(container.get("classy") instanceof StubClass);
});

test("registerClass should return a different instance of the class on consecutive gets", (t) => {
  t.plan(1);

  const StubClass = class { };
  const container = new Container();
  container.registerClass("classy", [], StubClass);
  const firstGet = container.get("classy");
  const secondGet = container.get("classy");

  t.notEqual(firstGet, secondGet);
});

test(
  "registerClass should return the same instance of the class on consecutive gets if singleton option is true",
  (t) => {
    t.plan(1);

    const StubClass = class { };
    const container = new Container();
    container.registerClass("classy", [], StubClass, { singleton: true });
    const firstGet = container.get("classy");
    const secondGet = container.get("classy");

    t.equal(firstGet, secondGet);
  });

test("registerClass should return the class for testing purposes", (t) => {
  t.plan(1);

  const StubClass = class { };
  const container = new Container();
  t.equal(container.registerClass("stubClass", [], StubClass), StubClass);
});

test("execute should execute the given function", (t) => {
  t.plan(1);

  const spy = sinon.spy();
  const container = new Container();
  container.execute([], spy);

  t.true(spy.calledOnce);
});

test("execute should have specified dependencies injected into it", (t) => {
  t.plan(3);

  class StubClass {
    public aMethod() {
      return "a value";
    }
  }

  const container = new Container();
  container.register("hello", "world");
  container.registerFactory("foo", [], () => "bar");
  container.registerClass("stubClass", [], StubClass);

  container.execute(["hello", "foo", "stubClass"], (hello: string, foo: string, stubClass: StubClass) => {
    t.equal(hello, "world");
    t.equal(foo, "bar");
    t.equal(stubClass.aMethod(), "a value");
  });
});

test("$get should let you access additional dependencies", (t) => {
  t.plan(1);

  const container = new Container();
  container.register("foo", "bar");
  const actual = container.execute(["$get"], ($get) => {
    return $get("foo");
  });

  t.equal(actual, "bar");
});
