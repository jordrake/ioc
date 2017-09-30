import container from "./container";

export default container.registerFactory("add", [], () => {
  return (a: number, b: number) => a + b;
});
