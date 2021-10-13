import test from 'ava'

import { IocContainer } from './IocContainer'

test('container should register types which resolve to instances', (t) => {
  const container = new IocContainer()

  interface IBird {
    fly: () => number
  }

  const bird: IBird = { fly: () => 5 }

  container.register<IBird, typeof bird>()

  const resolved = container.resolve<IBird>()

  const result = resolved.fly()
  const expected = bird.fly()
  t.is(result, expected)
})
