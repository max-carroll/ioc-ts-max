/**
 * TODO: Add docs - will TDD this first
 *
 * Use the iocContainer class to register and resolve dependencies
 */

interface Registration {
  interface: unknown
  implementation: unknown
}

export class IocContainer {
  registrations = Array<Registration>()

  // Stubbing register
  // TODO: remove lint disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public register<T1 extends any, T2>(t2: new () => T2): void {
    // type T0 = InstanceType<typeof T1>

    // const r1: T1 = createInstance(t1)

    class Timmy implements T1 {}

    // const y = <T2>{}
    const r2: T2 = createInstance(t2)

    const registration: Registration = {
      interface: a,
      implementation: r2,
    }

    this.registrations.push(registration)

    console.log({} as T1)
    console.log({} as T2)
    return
  }

  // Stubbing resolve
  // TODO: remove lint disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public resolve<T1>(): T1 {
    const r1 = <T1>{}
    const registration = this.registrations.find((reg) => typeof reg.interface === typeof r1)

    return registration.implementation as T1
  }
}

//https://dev.to/krumpet/generic-type-guard-in-typescript-258l
type Constructor<T> = { new (...args: any[]): T }
function typeGuard<T>(o, className: Constructor<T>): o is T {
  return o instanceof className
}
function createInstance<T>(t: new () => T): T {
  return new t()
}

// https://blog.rsuter.com/how-to-instantiate-a-generic-type-in-typescript/
// https://stackoverflow.com/questions/17382143/create-a-new-object-from-type-parameter-in-generic-class

// class B<T> {
//   Prop: T
//   constructor(TCreator: new () => T) {
//     this.Prop = new TCreator()
//   }

//   createNew(): T {
//     return {} as T
//   }
// }

class Factory<T> {
  create<T>(type: new () => T): T {
    return new type()
  }
}

// https://blog.logrocket.com/top-five-typescript-dependency-injection-containers/
