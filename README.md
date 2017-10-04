# Video player team application

Thank you for reviewing this project. This was a really interesting coding task. I'd like to explain a few design decisions taken:
- Some of the interface was inspired by my previous work in RequireJS and AngularJS 1.x, although the implementation is all own work.
- Despite being common practice in many JavaScript IoC container I opted for no global scope container (or containers selected by an id, see angular 1.x). this was an intentional decision to make it easier to build, test and consume the library. I have explained the 'workaround' for a default global container in the user README below.
- String references instead of Type references. I would have loved to have used Types instead of Strings to store the modules by however I am relatively new to TypeScript and the time taken to learn and implement that solution would have been significantly larger. The large downside of this is that types are swallowed and converted to `any`s on retrieval. This project should be seen as more of a JavaScript IoC container written in TypeScript than an IoC container for TypeScript. All that being said, I am really interested in seeing how the TypeScript IoC containers achieve it so I will be looking more into this anyway.
- Everything is converted to a factory function. The reasoning behind this is that I can achieve the other types (value and class) through this which removes logical branching on both register and retrieval. 

Any further questions, please do not hestitate to ask. See below for solution README.

# IOC

This is a simple IOC container written for JavaScript in TypeScript.

# Usage

### Creating a new container

```js
import Container from 'ioc';

const container = new Container();
```
This library does not create or manage instances of containers, this is to allow the consumers maximum flexibility. To achieve a single container across your entire application the recommendation is to put the above code in a single file and export `container`.

### Registering modules to the container
There are 3 register methods of varying flavours:

#### Value
```js
container.register('foo', {
  bar: 'qux'
});
```
This will register the object with the name of `hello` into the container. The same instance will be injected into all consumers of the `hello` module. 

#### Factory
```js
container.registerFactory('hello', ['foo'], function (foo) {
  return `Hello, ${foo.bar}` // === 'Hello, qux' (from value example above)
});
```
This allows you to register a function with an optional list of dependencies that will be applied to that function at retrieval time. All other register functions are derived from this, for example `register` is just `value => container.registerFactory(name, [], () => value)`. 

Retrieving a factory as a dependency will give you the return value of the factory function. 

Additionally you can provide an options object:
```ts
interface IModuleOptions {
  singleton?: boolean;
}
```
Passing true for `singleton` will ensure all consumers of the module will get the same value/result of the applied factory function. 

#### Class
```js
container.registerClass('goodbye', ['foo'], class Goodbye {
  constructor(foo) {
    this.foo = foo;
  }
  
  sayGoodbye() {
    return `Goodbye, ${this.foo.bar};` // === 'Goodbye, qux' (from value example above)
  }
});
```
This allows you to register a class with an optional list of dependencies which will be passed to the class's constructor at retrieval time. You can provide the same options object as seen in `registerFactory`. 

Retrieving a class as a dependency will give you an instance (via `new`) of this class.

##### Class Decorator
```ts
@Injectable(container, 'Hello', ['foo'])
class Hello {
  constructor(foo) {
    this.foo = foo;
  }
  sayHello() {
    return `Hello, ${this.foo.bar}!`; // === 'Hello, qux!' (from value example above)
  }
}
```
Additionally with classes you can use the `@Injectable` decorator instead of `container.registerClass`. This is basically an alias for `container.registerClass` so all the same parameters apply including options.

### Injection and Dependency Retrieval
As shown in the above examples, you can have dependencies injected by specifying it in the dependency array. You can access them outside of this via `container.get(name)` and with the special `$get` dependency which is automatically registered in every container:
```js
container.execute(['$get'], ($get) => {
  const dependency = $get(name);
});
```

### Execute
`container.execute` is a method which takes an anonymous factory with optional dependencies and immediately executes it. This can be useful as your top-level or 'main' function.

### Testing
All register methods return the original value/function/class so you can test as you would normally. See `src/examples/basic` for some practical examples of this.

### Examples

See the `src/examples` folder
