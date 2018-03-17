import MockModuleWrapper from './MockModuleWrapper'
import MockStoreWrapper from './MockStoreWrapper'

export function createMockStore () {
  return new MockStoreWrapper()
}

export function createMockModule (name, options) {
  if (!name) {
    throw new Error('[createMockModule] a module name is required when creating a mock module')
  }

  return new MockModuleWrapper(name, options)
}
