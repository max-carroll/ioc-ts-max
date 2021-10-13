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

  // register which interface a class hsould resolve to
  container.register('IBird', Eagle)

  // resolve the implemntation
  const resolved : IBird = container.resolve<IBird>('IBird')


```
