/**

 *
 * Use the iocContainer class to register and resolve dependencies
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
   * import { IocContainer } from 'ioc-ts-max'
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
   * @template Interface - The interface that the class implements.
   */
  public register<Interface>(
    key: string,
    className: new (container: IocContainer) => Interface,
    scope: Scope = 'transient',
  ): void {
    const existingRegistration = this.registrations.find((r) => r.key === key)

    if (existingRegistration) throw new Error('Cannot register the same interface twice')

    console.log(scope)
    this.registrations.push({
      key,
      implementation: className,
      scope,
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
   * @param key - A string key which will be used to register and resolve this type.
   * @template T - The interface the implementation will use.
   * @returns T - The instance of class resolved to.
   */
  public resolve<T>(key: string): T {
    const registration = this.registrations.find((reg) => reg.key === key)

    if (!registration) {
      throw new Error(`Cannot resolve '${key}' no implementations have been registered`)
    }

    if (registration.scope === 'singleton') {
      if (registration.instance) {
        return registration.instance as T
      } else {
        registration.instance = createInstance(registration.implementation, this)
        return registration.instance as T
      }
    }

    try {
      const newInstance = createInstance(registration.implementation, this)
      return newInstance as T
    } catch (e: any) {
      // TODO: Implement better way of handling circular dependencies
      if (e.message === 'Maximum call stack size exceeded') {
        throw new Error('Circular dependencies are not allowed')
      } else throw e
    }
  }
}

/**
 * returns a a new instance of a type passed in
 *
 * @template T - The type of which to instantiate.
 * @returns T - An instance of class resolved to.
 */
function createInstance<T extends { new (container: IocContainer) }>(constructor: T, container: IocContainer) {
  return new constructor(container)
}

/**
 * An object which allows implementations of objects to be mapped against a string.
 */
interface Registration {
  key: string
  implementation: new (container: IocContainer) => unknown
  scope: Scope
  instance?: unknown
}

type Scope = 'singleton' | 'transient'
