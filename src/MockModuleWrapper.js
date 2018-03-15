import td from 'testdouble'

class MockModuleWrapper {
  constructor (name, module = {}) {
    this.name = name
    this.module = module
  }

  withState (state = {}) {
    this.module.state = Object.assign({}, this.module.state, state)

    return new MockModuleWrapper(this.name, this.module)
  }

  withActions (actions = []) {
    const existingActions = this.module.actions || {}
    const newActions = {}

    actions.forEach(name => {
      newActions[name] = td.function()
    })

    this.module.actions = Object.assign({}, existingActions, newActions)

    return new MockModuleWrapper(this.name, this.module)
  }

  withGetters (getters = []) {
    const existingGetters = this.module.getters || {}
    const newGetters = {}

    getters.forEach(name => {
      newGetters[name] = td.function()
    })

    this.module.getters = Object.assign({}, existingGetters, newGetters)

    return new MockModuleWrapper(this.name, this.module)
  }

  withModule (name, module = {}) {
    const existingModules = this.module.modules || {}
    const newModules = {}

    if (name) {
      newModules[name] = module
    }

    this.module.modules = Object.assign({}, existingModules, newModules)

    return new MockModuleWrapper(this.name, this.module)
  }
}

export default MockModuleWrapper
