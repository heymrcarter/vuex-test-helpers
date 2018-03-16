import MockStoreWrapper from './MockStoreWrapper'

describe('MockStoreWrapper', () => {
  let subject

  beforeEach(() => {
    subject = new MockStoreWrapper()
  })

  it('has a store', () => {
    expect(subject.store).not.to.be.undefined // eslint-disable-line
  })

  describe('when instantiated with an existing store', () => {
    let store
    beforeEach(() => {
      store = {
        state: { foo: 'bar' },
        getters: {},
        actions: {}
      }
      subject = new MockStoreWrapper(store)
    })

    it('uses the given store', () => {
      expect(subject.store).to.deep.equal(store)
    })
  })

  describe('withState', () => {
    describe('when called with no state object', () => {
      beforeEach(() => {
        subject.withState()
      })

      it('creates a default state object', () => {
        expect(subject.store.state).to.deep.equal({})
      })
    })

    describe('when called with a state object', () => {
      let state

      beforeEach(() => {
        state = {
          foo: 'bar'
        }
        subject.withState(state)
      })

      it('creates a default state object', () => {
        expect(subject.store.state).to.deep.equal(state)
      })
    })

    describe('chaining', () => {
      describe('withState', () => {
        beforeEach(() => {
          subject.withState({ test1: 'value1' }).withState({ test2: 'value2' })
        })

        it('merges new state with old state', () => {
          expect(subject.store.state.test1).to.equal('value1')
          expect(subject.store.state.test2).to.equal('value2')
        })
      })

      describe('withGetters', () => {
        beforeEach(() => {
          subject.withState().withGetters()
        })

        it('creates getters', () => {
          expect(subject.store.getters).to.deep.equal({})
        })
      })

      describe('withActions', () => {
        beforeEach(() => {
          subject.withState().withActions()
        })

        it('creates actions', () => {
          expect(subject.store.actions).to.deep.equal({})
        })
      })

      describe('withModule', () => {
        beforeEach(() => {
          subject.withState().withModule()
        })

        it('creates modules', () => {
          expect(subject.store.modules).to.deep.equal({})
        })
      })
    })
  })

  describe('withGetters', () => {
    describe('when called with no getter name', () => {
      beforeEach(() => {
        subject.withGetters()
      })

      it('creates a default getters object', () => {
        expect(subject.store.getters).to.deep.equal({})
      })
    })

    describe('when called with getters names', () => {
      beforeEach(() => {
        subject.withGetters(['getter1', 'getter2'])
      })

      it('creates mock getters for each name', () => {
        subject.store.getters.getter1()
        subject.store.getters.getter2()

        td.verify(subject.store.getters.getter1())
        td.verify(subject.store.getters.getter2())
      })
    })

    describe('chaining', () => {
      describe('withState', () => {
        beforeEach(() => {
          subject.withGetters().withState()
        })

        it('creates state', () => {
          expect(subject.store.state).to.deep.equal({})
        })
      })

      describe('withActions', () => {
        beforeEach(() => {
          subject.withGetters().withActions()
        })

        it('creates state', () => {
          expect(subject.store.actions).to.deep.equal({})
        })
      })

      describe('withModules', () => {
        beforeEach(() => {
          subject.withGetters().withModule()
        })

        it('creates state', () => {
          expect(subject.store.modules).to.deep.equal({})
        })
      })

      describe('withGetters', () => {
        beforeEach(() => {
          subject.withGetters(['getter1']).withGetters(['getter2'])
        })

        it('merges getters', () => {
          subject.store.getters.getter1()
          subject.store.getters.getter2()

          td.verify(subject.store.getters.getter1())
          td.verify(subject.store.getters.getter2())
        })
      })
    })
  })

  describe('withActions', () => {
    describe('when called with no actkion name', () => {
      beforeEach(() => {
        subject.withActions()
      })

      it('creates a default getters object', () => {
        expect(subject.store.actions).to.deep.equal({})
      })
    })

    describe('when called with action names', () => {
      beforeEach(() => {
        subject.withActions(['action1', 'action2'])
      })

      it('creates a mock action for each name', () => {
        subject.store.actions.action1()
        subject.store.actions.action2()

        td.verify(subject.store.actions.action1())
        td.verify(subject.store.actions.action2())
      })
    })

    describe('chaining', () => {
      describe('withState', () => {
        beforeEach(() => {
          subject.withActions().withState()
        })

        it('creates state', () => {
          expect(subject.store.state).to.deep.equal({})
        })
      })

      describe('withGetters', () => {
        beforeEach(() => {
          subject.withActions().withGetters()
        })

        it('creates state', () => {
          expect(subject.store.getters).to.deep.equal({})
        })
      })

      describe('withModules', () => {
        beforeEach(() => {
          subject.withActions().withModule()
        })

        it('creates state', () => {
          expect(subject.store.modules).to.deep.equal({})
        })
      })

      describe('withActions', () => {
        beforeEach(() => {
          subject.withActions(['action1']).withActions(['action2'])
        })

        it('merges actions', () => {
          subject.store.actions.action1()
          subject.store.actions.action2()

          td.verify(subject.store.actions.action1())
          td.verify(subject.store.actions.action2())
        })
      })
    })
  })

  describe('withModule', () => {
    describe('when called without args', () => {
      beforeEach(() => {
        subject.withModule()
      })

      it('creates a default modules object', () => {
        expect(subject.store.modules).to.deep.equal({})
      })
    })

    describe('when called with a module name and object', () => {
      let module
      beforeEach(() => {
        module = { state: { foo: 'bar' } }
        subject.withModule('test', module)
      })

      it('adds the module to the store', () => {
        expect(subject.store.modules.test).to.deep.equal(module)
      })
    })

    describe('chaining', () => {
      describe('withState', () => {
        beforeEach(() => {
          subject.withModule().withState()
        })

        it('creates state', () => {
          expect(subject.store.state).to.deep.equal({})
        })
      })

      describe('withGetters', () => {
        beforeEach(() => {
          subject.withModule().withGetters()
        })

        it('creates state', () => {
          expect(subject.store.getters).to.deep.equal({})
        })
      })

      describe('withActions', () => {
        beforeEach(() => {
          subject.withModule().withActions()
        })

        it('creates state', () => {
          expect(subject.store.actions).to.deep.equal({})
        })
      })

      describe('withModules', () => {
        beforeEach(() => {
          subject.withModule('module1').withModule('module2')
        })

        it('merges moduless', () => {
          expect(subject.store.modules.module1).to.deep.equal({})
          expect(subject.store.modules.module2).to.deep.equal({})
        })
      })
    })
  })
})
