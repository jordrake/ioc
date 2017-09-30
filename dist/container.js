"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() {
        this.registry = new Map();
    }
    registerFactory(name, dependencies, factory, options = {}) {
        if (this.registry.has(name)) {
            throw new Error(`${module} has already been registered in this container`);
        }
        this.registry.set(name, {
            dependencies,
            factory,
            options,
        });
        return factory;
    }
    register(name, value) {
        this.registerFactory(name, [], () => value);
        return value;
    }
    registerClass(name, dependencies, Constructable, options = {}) {
        const classAsFactory = (...args) => new Constructable(...args);
        this.registerFactory(name, dependencies, classAsFactory, options);
        return Constructable;
    }
    get(name) {
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
    execute(dependencies, factory) {
        const args = dependencies.map(this.get.bind(this));
        return factory(...args);
    }
}
exports.default = Container;
