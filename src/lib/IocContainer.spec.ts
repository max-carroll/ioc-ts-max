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
