import test from 'ava'

import { IocContainer } from './iocContainer'

test('IocContainer', (t) => {
  const container = new IocContainer()

  interface IBird {
    fly: () => number
  }

  class Eagle implements IBird {
    wings = 2
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
