import { createMockStore } from './utils'
const td = global.td

describe.skip('createMockStore', () => {
  let subject

  beforeEach(() => {
    subject = createMockStore()
  })

  afterEach(() => {
    subject.flush()
  })

  it('contains an empty store', () => {
    expect(subject.store).toEqual({})
  })

  it('has a "withState" method', () => {
    expect(subject.withState).toBeDefined()
  })

  it('has a "withGetters" method', () => {
    expect(subject.withState).toBeDefined()
  })

  it('has a "withActions" method', () => {
    expect(subject.withState).toBeDefined()
  })

  it('has a withModule method', () => {
    expect(subject.withModule).toBeDefined()
  })

  it('has a "flush" method', () => {
    expect(subject.flush).toBeDefined()
  })

  describe('flush', () => {
    it('resets the store to a default object', () => {
      subject.withState({ some: 'state' })
      subject.flush()

      expect(subject.store).toEqual({})
    })
  })

  describe.only('withState', () => {
    describe('when called with no arguments', () => {
      beforeEach(() => {
        subject.withState()
      })

      it('updates the store property with a default state object', () => {
        expect(subject.store.state).toEqual({})
      })
    })

    describe('when called with a state object', () => {
      beforeEach(() => {
        subject.withState({
          foo: 'bar',
          baz: 14
        })
      })

      it(`updates the store's state object with the give state`, () => {
        expect(subject.store.state.foo).toEqual('bar')
        expect(subject.store.state.baz).toEqual(14)
      })
    })

    describe('chaining', () => {
      let result

      beforeEach(() => {
        result = subject.withState()
      })

      describe('withGetters', () => {
        describe('when called without getter names', () => {
          it('creates a default getters object', () => {
            expect(subject.store.getters).toBeUndefined()
            result.withGetters()

            expect(subject.store.getters).toEqual({})
          })
        })

        describe('when called with getter names', () => {
          it('creates a getters object with mocked getter methods', () => {
            expect(subject.store.getters).toBeUndefined()
            result.withGetters(['getter1', 'getter2'])

            subject.store.getters.getter1()
            subject.store.getters.getter2()

            td.verify(subject.store.getters.getter1())
            td.verify(subject.store.getters.getter2())
          })
        })
      })

      describe('withActions', () => {
        describe('when called without action names', () => {
          it('creates a default actions object', () => {
            expect(subject.store.actions).toBeUndefined()
            result.withActions()

            expect(subject.store.actions).toEqual({})
          })
        })

        describe('when called with action names', () => {
          it('creates a default action object', () => {
            expect(subject.store.action).toBeUndefined()
            result.withActions(['action1', 'action2'])

            subject.store.actions.action1()
            subject.store.actions.action2()

            td.verify(subject.store.actiona.action1())
            td.verify(subject.store.actions.action2())
          })
        })
      })
    })
  })

  describe('withGetters', () => {
    describe('when called with no arguments', () => {
      beforeEach(() => {
        subject.withGetters()
      })

      it('updates the store object with a default getters object', () => {
        expect(subject.store.getters).toEqual({})
      })
    })

    describe('when called with an array of getter names', () => {
      beforeEach(() => {
        subject.withGetters(['getter1', 'getter2'])
      })

      it('adds a mock getter function to the getters object for each name', () => {
        expect(subject.store.getters.getter1).toBeDefined()
        expect(subject.store.getters.getter2).toBeDefined()

        subject.store.getters.getter1()
        subject.store.getters.getter2()

        td.verify(subject.store.getters.getter1())
        td.verify(subject.store.getters.getter2())
      })
    })

    describe('chaining', () => {
      let result

      beforeEach(() => {
        result = subject.withGetters()
      })

      it('chains with "withActions"', () => {
        expect(subject.store.actions).toBeUndefined()

        result.withActions()

        expect(subject.store.actions).toEqual({})
      })
    })
  })

  describe('withActions', () => {
    describe('when called with no arguments', () => {
      beforeEach(() => {
        subject.withActions()
      })

      it('updates the store object with a default actions object', () => {
        expect(subject.store.actions).toEqual({})
      })
    })

    describe('when called with an array of action names', () => {
      beforeEach(() => {
        subject.withActions(['action1', 'action2'])
      })

      it('adds a mock action function to the actions object for each name', () => {
        expect(subject.store.actions.action1).toBeDefined()
        expect(subject.store.actions.action2).toBeDefined()

        subject.store.actions.action1()
        subject.store.actions.action2()

        td.verify(subject.store.actions.action1())
        td.verify(subject.store.actions.action2())
      })
    })

    describe('chaining', () => {
      let result

      beforeEach(() => {
        result = subject.withActions()
      })

      it('chain with "withState"', () => {
        expect(subject.store.state).toBeUndefined()
        result.withState()
        expect(subject.store.state).toEqual({})
      })

      it('chain with "withGetters"', () => {
        expect(subject.store.getters).toBeUndefined()
        result.withGetters()
        expect(subject.store.getters).toEqual({})
      })
    })
  })

  describe('withModule', () => {
    describe('when called with no args', () => {
      beforeEach(() => {
        subject.withModule()
      })

      it('adds a default modules object to the store', () => {
        expect(subject.store.modules).toEqual({})
      })
    })

    describe('when called with a module name', () => {
      beforeEach(() => {
        subject.withModule('myModule')
      })

      it('adds a module in the modules object with the given name', () => {
        expect(subject.store.modules.myModule).toEqual({})
      })
    })

    describe('chaining', () => {
      describe('withState', () => {
        let result

        describe('when called without a state object', () => {
          beforeEach(() => {
            result = subject.withModule('myModule')
          })

          it('creates default state for the given module', () => {
            result.withState('myModule')

            expect(subject.store.state).toBeUndefined()
            expect(subject.store.modules.myModule.state).toEqual({})
          })
        })

        describe('when called with a state object', () => {
          beforeEach(() => {
            result = subject.withModule('myModule')
          })

          it('creates default state for the given module', () => {
            result.withState('myModule', { foo: 'bar' })

            expect(subject.store.state).toBeUndefined()
            expect(subject.store.modules.myModule.state).toEqual({ foo: 'bar' })
          })
        })
      })

      describe('withGetters', () => {
        let result

        describe('when called without a list of getter names', () => {
          beforeEach(() => {
            result = subject.withModule('myModule')
          })

          it('creates a default getters object for the module', () => {
            result.withGetters('myModule')

            expect(subject.store.getters).toBeUndefined()
            expect(subject.store.modules.myModule.getters).toEqual({})
          })
        })

        describe('when called with a list of getter names', () => {
          beforeEach(() => {
            result = subject.withModule('myModule')
          })

          it('creates a getters object for the module with stubbed methods', () => {
            result.withGetters('myModule', ['getter1', 'getter2'])

            expect(subject.store.getters).toBeUndefined()

            subject.store.modules.myModule.getters.getter1()
            subject.store.modules.myModule.getters.getter2()

            td.verify(subject.store.modules.myModule.getters.getter1())
            td.verify(subject.store.modules.myModule.getters.getter2())
          })
        })
      })

      describe('withActions', () => {
        let result

        describe('when called without a list of action names', () => {
          beforeEach(() => {
            result = subject.withModule('myModule')
          })

          it('creates a default actions object for the module', () => {
            result.withActions('myModule')

            expect(subject.store.actions).toBeUndefined()
            expect(subject.store.modules.myModule.actions).toEqual({})
          })
        })

        describe('when called with a list of getter names', () => {
          beforeEach(() => {
            result = subject.withModule('myModule')
          })

          it('creates a actions object for the module with stubbed methods', () => {
            result.withActions('myModule', ['action1', 'action2'])

            expect(subject.store.actions).toBeUndefined()

            subject.store.modules.myModule.actions.action1()
            subject.store.modules.myModule.actions.action2()

            td.verify(subject.store.modules.myModule.actions.action1())
            td.verify(subject.store.modules.myModule.actions.action2())
          })
        })
      })
    })
  })
})
