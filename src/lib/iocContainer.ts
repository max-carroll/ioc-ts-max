/**
 * TODO: Add docs - will TDD this first
 *
 * Use the iocContainer class to register and resolve dependencies
 */
export class IocContainer {
  // Stubbing register
  // TODO: remove lint disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public register<T1, T2>(): void {}

  // Stubbing resolve
  // TODO: remove lint disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public resolve<T1>(): T1 {
    const result = {} as T1
    return result
  }
}

// https://blog.rsuter.com/how-to-instantiate-a-generic-type-in-typescript/
// https://stackoverflow.com/questions/17382143/create-a-new-object-from-type-parameter-in-generic-class

class B<T> {
  Prop: T
  constructor(TCreator: new () => T) {
    this.Prop = new TCreator()
  }

  createNew(): T {
    return {} as T
  }
}

// class Factory<T> {
//   create<T>(type: new () => T): T {
//     return new type()
//   }
// }
