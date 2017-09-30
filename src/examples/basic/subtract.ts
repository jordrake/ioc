import container from "./container";

container.registerFactory("subtract", [], () => {
  return (a: number, b: number) => a - b;
});
