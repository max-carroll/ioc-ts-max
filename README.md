# ioc-ts-max

Provides an IoC container which can be used for registering and resolving dependencies.

# Usage

```js

  import {IocContainer} from 'ioc-ts-max'

  // create a container for registering types to resolve to
  const container = new IocContainer()

  interface IBird {
    fly: () => number
  }

  class Eagle implements IBird {
    public fly() {
      return 5
    }
  }

  // register which interface a class should resolve to
  container.register('IBird', Eagle)

  // resolve the implementation
  const resolved : IBird = container.resolve<IBird>('IBird')

```

# Singleton Scope

```js

  import {IocContainer} from 'ioc-ts-max'

  // create a container for registering types to resolve to
  const container = new IocContainer()

  interface ICounter {
    increment: () => number
  }

  class Counter implements ICounter {
    current = 0
    public increment() {
      this.current++
      return this.current
    }
  }

  // register ICounter to resolve with singleton scope
  container.register('ICounter', Counter, SCOPE.SINGLETON)

  // resolve the implementation
  const counter1 : ICounter = container.resolve<ICounter>('ICounter')
  const counter2 : ICounter = container.resolve<ICounter>('ICounter')

  // counter1 and counter 2 are references to the same instance
  counter1.increment() // 1
  counter2.increment() // 2
  counter1.increment() // 3

```

# Contributing

See our guide to [contributing](.github/CONTRIBUTING.md)

# Evaluation

To see an evaluation of the first round of initial development see [evaluation](EVALUATION.md)
