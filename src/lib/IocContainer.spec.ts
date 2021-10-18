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

  t.throws(
    () => container.register('IBird', Eagle),
    { instanceOf: Error, message: 'Cannot register the same interface twice' },
    'expect second registration to return an error',
  )
})

test('IocContainer - When dependencies also have dependencies, expect they are injected', (t) => {
  const container = new IocContainer()

  interface IRobot {
    laser: ILaser
  }

  interface ILaser {
    fire: () => string
  }

  class Laser implements ILaser {
    public fire() {
      return 'beep'
    }
  }
  class R2D2 implements IRobot {
    laser: ILaser
    constructor(container: IocContainer) {
      this.laser = container.resolve<ILaser>('ILaser')
    }
  }

  container.register('ILaser', Laser)
  container.register('IRobot', R2D2)

  const r2d2 = container.resolve<IRobot>('IRobot')
  const result = r2d2.laser.fire()
  t.is(result, 'beep')
})

test('IocContainer - When dependencies arent registered, throw error', (t) => {
  const container = new IocContainer()

  interface IThing {}

  const error = t.throws(() => container.resolve<IThing>('IThing'))

  t.truthy(error)
  t.is(error.message, `Cannot resolve 'IThing' no implementations have been registered`)
})

test('IocContainer - When dependencies are circular, throw error', (t) => {
  const container = new IocContainer()

  interface IThing1 {}

  interface IThing2 {}

  class Thing1 implements IThing1 {
    thing2: IThing2
    constructor(container: IocContainer) {
      this.thing2 = container.resolve<IThing2>('IThing2')
    }
  }

  class Thing2 implements IThing2 {
    thing1: IThing1
    constructor(container: IocContainer) {
      this.thing1 = container.resolve<IThing1>('IThing1')
    }
  }

  container.register('IThing1', Thing1)
  container.register('IThing2', Thing2)

  const error = t.throws(() => container.resolve<IThing1>('IThing1'))

  t.truthy(error)
  t.is(error.message, 'Circular dependencies are not allowed')
})

test('IocContainer - Dependencies default to transient scope', (t) => {
  const container = new IocContainer()

  interface ICounter {
    increment: () => number
  }

  class Counter implements ICounter {
    current = 0
    public increment(): number {
      this.current++
      return this.current
    }
  }

  container.register('ICounter', Counter)

  const counter1 = container.resolve<ICounter>('ICounter')
  const counter2 = container.resolve<ICounter>('ICounter')

  const counter1Result = counter1.increment()
  const counter2Result = counter2.increment()

  t.is(counter1Result, 1)
  t.is(counter2Result, 1)
})
