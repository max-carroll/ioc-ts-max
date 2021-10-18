import test from 'ava'

import { IocContainer } from './iocContainer'

test('IocContainer Resolves to an instance of the registered class', (t) => {
  const container = new IocContainer()

  interface IBird {
    fly: () => number
  }

  class Eagle implements IBird {
    public fly() {
      return 5
    }
  }

  container.register('IBird', Eagle)
  const resolved = container.resolve<IBird>('IBird')

  const result = resolved.fly()
  const expected = 5
  t.is(result, expected)
})

test('IocContainer cannot register to the same interface twice', (t) => {
  const container = new IocContainer()

  interface IBird {
    fly: () => number
  }

  class Eagle implements IBird {
    public fly() {
      return 5
    }
  }

  container.register('IBird', Eagle)
  const secondRegistration = () => container.register('IBird', Eagle)

  const error = t.throws(secondRegistration, { instanceOf: Error }, 'expect second registration to return an error')

  t.is(error.message, 'Cannot register the same interface twice')
})
