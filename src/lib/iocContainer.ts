import { Registration } from './Registration'
import { Scope } from './Scope'

/**
 *
 *  Use the iocContainer class to register and resolve dependencies
 *
 *    * ### Import as ES Module
 * ```js
 * import { IocContainer } from 'ioc-ts-max'
 * ```
 *
 * ### Register a dependency to resolve in transient scope
 *  ```js
 * interface IBird {}
 * class Eagle implements IBird {}
 * var container = new IocContainer()
 *
 * container.register('IBird', Eagle)
 * var bird = container.resolve<IBird>("IBird")
 * ```
 *
 *  ### Register a dependency to resolve in singleton scope
 *  ```js
 * interface IBird {}
 * class Counter implements ICounter {}
 * var container = new IocContainer()
 *
 * container.register('ICounter', Counter, 'singleton')
 * var counter1 = container.resolve<ICounter>("ICounter")
 * var counter2 = container.resolve<ICounter>("ICounter")
 *
 * counter1.increment() // 1
 * counter2.increment() // 2
 * ```
 */
export class IocContainer {
  /**
   * A look up of all the registrations that have been registered
   */
  private registrations = Array<Registration>()

  /**
   * Registers a concrete implementation of an interface to a string
   * which can be used subsequently to resolve to.
   *
   * ### Example (es module)
   * ```js
   *
   * interface IBird {}
   * class Eagle implements IBird {}
   * var container = new IocContainer()
   *
   * container.register('IBird', Eagle)
   * ```
   *
   * @param key - A string key which will be used to register and resolve this type.
   * @param className - The class to instantiate when resolving by the key.
   * @param scope - Whether to resolve in transient or singleton scope
   * @template Interface - The interface that the class implements.
   */
  public register<Interface>(
    key: string,
    className: new (container: IocContainer) => Interface,
    scope: Scope = 'transient',
  ): void {
    const existingRegistration = this.registrations.find((r) => r.key === key)

    if (existingRegistration) throw new Error('Cannot register the same interface twice')

    this.registrations.push({
      key,
      implementation: className,
      scope,
    })
    return
  }

  /**
   * Resolves to the registered implementation of an interface.
   *
   * @param key - A string key which will be used to register and resolve this type.
   * @template T - The interface the implementation will use.
   * @returns T - The instance of class resolved to.
   */
  public resolve<T>(key: string): T {
    const registration = this.registrations.find((reg) => reg.key === key)

    if (!registration) {
      throw new Error(`Cannot resolve '${key}' no implementations have been registered`)
    }

    const { scope, instance } = registration

    if (scope === 'singleton' && !instance) {
      registration.instance = createInstance(registration.implementation, this)
      return registration.instance as T
    }

    if (scope === 'singleton' && instance) {
      return instance as T
    }

    const newInstance = createInstance(registration.implementation, this)
    return newInstance as unknown as T
  }
}

/**
 * returns a a new instance of a type passed in
 *
 * @template T - The type to instantiate.
 * @returns T - An instance of class resolved to.
 */
function createInstance<T extends { new (container: IocContainer) }>(constructor: T, container: IocContainer) {
  try {
    const instance = new constructor(container)
    return instance as T
  } catch (e: any) {
    // TODO: Implement better way of handling circular dependencies
    if (e.message === 'Maximum call stack size exceeded') {
      throw new Error('Circular dependencies are not allowed')
    } else throw e
  }
}
