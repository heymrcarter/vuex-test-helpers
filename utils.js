const td = global.td

function withState(store, state, module) {
  if (module === 'root') {
    store.state = state
    return
  }

  if (!module) {
    throw new Error('[withState] A module name is required when chaining withState')
  }

  store.modules[module].state = state
}

function withGetters(store, getters = [], module) {
  if (module === 'root') {
    store.getters = {}
    getters.forEach(name => {
      store.getters[name] = td.function()
    })
    return
  }

  if (!module) {
    throw new Error('[withGetters] A module name is required when chaining withGetters')
  }

  store.modules[module].getters = {}
  getters.forEach(name => {
    store.modules[module].getters[name] = td.function()
  })
}

function withActions(store, actions = [], module) {
  if (module === 'root') {
    store.actions = {}
    actions.forEach(name => {
      store.actions[name] = td.function()
    })
    return
  }

  if (!module) {
    throw new Error('[withActions] A module name is required when chaining withActions')
  }

  store.modules[module].actions = {}

  actions.forEach(name => {
    store.modules[module].actions[name] = td.function()
  })
}

class MockStoreWrapper {
  constructor() {
    this.store = {}
  }

  flush() {
    this.store = {}
  }

  withState(state = {}) {
    withState(this.store, state, 'root')

    return {
      withGetters: (module = 'root', getters = []) => withGetters(this.store, getters, module),
      withActions: (module = 'root', actions = []) => withActions(this.store, actions, module)
    }
  }

  withGetters(getterNames = []) {
    withGetters(this.store, getterNames)

    return {
      withState: (state = {}) => withState(this.store, state),
      withActions: (actions = {}) => withActions(this.store, actions)
    }
  }

  withActions(actionNames = []) {
    withActions(this.store, actionNames)

    return {
      withGetters: (getters = {}) => withGetters(this.store, getters),
      withState: (state = {}) => withState(this.store, state)
    }
  }

  withModule(moduleName) {
    this.store.modules = {}

    if (moduleName) {
      this.store.modules[moduleName] = {}
    }

    return {
      withState: (moduleName, state = {}) => withState(this.store, state, moduleName),
      withGetters: (moduleName, getters = []) => withGetters(this.store, getters, moduleName),
      withActions: (moduleName, actions = []) => withActions(this.store, actions, moduleName)
    }
  }
}

export function createMockStore() {
  return new MockStoreWrapper()
}
