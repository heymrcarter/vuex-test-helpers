import MockModuleWrapper from './MockModuleWrapper'
import MockStoreWrapper from './MockStoreWrapper'

export function createMockStore () {
  return new MockStoreWrapper()
}

export function createMockModule () {
  return new MockModuleWrapper()
}
