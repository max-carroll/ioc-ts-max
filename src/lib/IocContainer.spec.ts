import test from 'ava'

import { IocContainer } from './IocContainer'

test('IocContainer', (t) => {
  const container = new IocContainer()

  interface IBird {
    fly: () => number
  }

  class Eagle implements IBird {
    fly: () => 5
  }

  container.register<IBird, Eagle>(Eagle)

  const resolved = container.resolve<IBird>()

  const result = resolved.fly()
  const expected = 5
  t.is(result, expected)
})
