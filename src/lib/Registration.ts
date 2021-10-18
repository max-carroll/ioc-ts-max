import { Scope } from './Scope'
import { IocContainer } from './iocContainer'

/**
 * An object which allows implementations of objects to be mapped against a string.
 */
export interface Registration {
  /** The key which is used to identify the registration */
  key: string
  /** The implementation of the registration */
  implementation: new (container: IocContainer) => unknown
  /** The scope in which to resolve instances */
  scope: Scope
  /** If a singleton scope use this instance */
  instance?: unknown
}
