/**
 * Whether to resolve dependency to a transient or a singleton instance
 */
export type Scope = 'singleton' | 'transient'

export enum SCOPE {
  SINGLETON = 'singleton',
  TRANSIENT = 'transient',
}
