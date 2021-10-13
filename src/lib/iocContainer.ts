/**
 * TODO: Add docs - will TDD this first
 *
 * Use the iocContainer class to register and resolve dependencies
 */

interface Registration {
  interface: string
  implementation: unknown
}

export class IocContainer {
  registrations = Array<Registration>()

  // Stubbing register
  // TODO: remove lint disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public register<T2>(regKey: string, t2: new () => T2): void {
    const r2: T2 = createInstance(t2)

    const registration: Registration = {
      interface: regKey,
      implementation: r2,
    }

    this.registrations.push(registration)

    return
  }

  // Stubbing resolve
  // TODO: remove lint disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public resolve<T1>(regKey: string): T1 {
    const registration = this.registrations.find((reg) => reg.interface === regKey)

    return registration.implementation as T1
  }
}

//https://dev.to/krumpet/generic-type-guard-in-typescript-258l

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

// https://blog.logrocket.com/top-five-typescript-dependency-injection-containers/
