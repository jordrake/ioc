import IConstructable from "./constructable";

export interface IModuleOptions {
  singleton?: boolean;
}

interface IModule {
  dependencies: string[];
  factory: Factory;
  options: IModuleOptions;
  instance?: any;
}

type Factory = (...args: any[]) => any;

export default class Container {
  private registry: Map<string, IModule>;

  constructor() {
    this.registry = new Map();
    this.register("$get", this.get.bind(this));
  }

  public registerFactory(
    name: string, dependencies: string[],
    factory: Factory,
    options: IModuleOptions = {},
  ): Factory {
    if (this.registry.has(name)) {
      throw new Error(`${name} has already been registered in this container`);
    }

    this.registry.set(name, {
      dependencies,
      factory,
      options,
    });

    return factory;
  }

  public register(name: string, value: any) {
    this.registerFactory(name, [], () => value);
    return value;
  }

  public registerClass(
    name: string,
    dependencies: string[],
    Constructable: IConstructable,
    options: IModuleOptions = {},
  ): IConstructable {
    const classAsFactory = (...args: any[]) => new Constructable(...args);

    this.registerFactory(name, dependencies, classAsFactory, options);

    return Constructable;
  }

  public get(name: string) {
    const module = this.registry.get(name);

    if (!module) {
      throw new Error(`${name} has not been registered in this container`);
    }

    if (module.instance) {
      return module.instance;
    }

    const result = this.execute(module.dependencies, module.factory);

    return module.options.singleton ? (module.instance = result) : result;
  }

  public execute(dependencies: string[], factory: Factory) {
    const args = dependencies.map(this.get.bind(this));
    return factory(...args);
  }
}
