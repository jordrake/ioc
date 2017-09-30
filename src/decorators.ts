import IConstructable from "./constructable";
import Container, { IModuleOptions } from "./container";

export default function Injectable(
  container: Container,
  name: string,
  dependencies: string[] = [],
  options: IModuleOptions = {},
) {
  return (target: IConstructable) => container.registerClass(name, dependencies, target, options);
}
