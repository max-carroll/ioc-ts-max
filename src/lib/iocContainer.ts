/**

 *
 * Use the iocContainer class to register and resolve dependencies
 */
export class IocContainer {
  /**
   * a look up of all the registrations that have been registered
   */
  private registrations = Array<Registration>()

  /**
   * Registers a concrete implementation of an interface to a string
   * which can be used subsequently to resolve to.
   *
   * ### Example (es module)
   * ```js
   * import { IocContainer } from 'ioc-ts-max'
   *
   * interface IBird {}
   * class Eagle implements IBird {}
   * var container = new IocContainer()
   *
   * container.register('IBird', Eagle)
   * ```
   *
   * @param key - a string key which will be used to register and resolve this type
   * @param className - the class to instantiate when resolving by the key
   * @template Interface - the interface that the class implements
   */
  public register<Interface>(key: string, className: new () => Interface): void {
    const implementation: Interface = createInstance(className)
    this.registrations.push({
      key,
      implementation,
    })
    return
  }

  /**
   * Registers a concrete implementation of an interface to a string
   * which can be used subsequently to resolve to.
   *
   * ### Example (es module)
   * ```js
   * import { IocContainer } from 'ioc-ts-max'
   *
   * interface IBird {}
   * class Eagle implements IBird {}
   * var container = new IocContainer()
   *
   * container.register('IBird', Eagle)
   * var bird = container.resolve<IBird>("IBird")
   
   * 
   * ```
   *
   * @param key - a string key which will be used to register and resolve this type
   * @template T - the interface the implementation will use
   * @returns T - the instance of class resolved to
   */
  public resolve<T>(key: string): T {
    const registration = this.registrations.find((reg) => reg.key === key)
    return registration.implementation as T
  }
}

/**
 * returns a a new instance of a type passed in
 *
 * @template T - The type of which to instantiate
 * @returns T - An instance of class resolved to
 */
function createInstance<T>(t: new () => T): T {
  return new t()
}

/**
 * an object which allows implementations of objects to be mapped against a string
 */
interface Registration {
  key: string
  implementation: unknown
}
