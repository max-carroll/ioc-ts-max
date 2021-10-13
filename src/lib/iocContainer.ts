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

  // TODO Document
  public register<T2>(regKey: string, t2: new () => T2): void {
    const r2: T2 = createInstance(t2)

    const registration: Registration = {
      interface: regKey,
      implementation: r2,
    }

    this.registrations.push(registration)

    return
  }

  // TODO: document
  public resolve<T1>(regKey: string): T1 {
    const registration = this.registrations.find((reg) => reg.interface === regKey)

    return registration.implementation as T1
  }
}

// TODO: document
function createInstance<T>(t: new () => T): T {
  return new t()
}
