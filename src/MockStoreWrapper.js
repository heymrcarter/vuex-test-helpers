import td from 'testdouble'

class MockStoreWrapper {
  constructor (store = {}) {
    this.store = store
  }

  withState (state = {}) {
    this.store.state = Object.assign({}, this.store.state, state)

    return new MockStoreWrapper(this.store)
  }

  withGetters (getters = []) {
    const existingGetters = this.store.getters || {}
    const newGetters = {}
    getters.forEach(name => {
      newGetters[name] = td.function()
    })

    this.store.getters = Object.assign({}, existingGetters, newGetters)

    return new MockStoreWrapper(this.store)
  }

  withActions (actions = []) {
    const existingActions = this.store.actions || {}
    const newActions = {}
    actions.forEach(name => {
      newActions[name] = td.function()
    })

    this.store.actions = Object.assign({}, existingActions, newActions)

    return new MockStoreWrapper(this.store)
  }

  withModule (name, module = {}) {
    const existingModules = this.store.modules || {}
    const newModules = {}

    if (name) {
      newModules[name] = module
    }

    this.store.modules = Object.assign({}, existingModules, newModules)

    return new MockStoreWrapper(this.store)
  }
}

export default MockStoreWrapper
