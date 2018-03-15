import MockModuleWrapper from './MockModuleWrapper'
const td = global.td

describe('MockModuleWrapper', () => {
  let subject

  beforeEach(() => {
    subject = new MockModuleWrapper('test')
  })

  it('has a name', () => {
    expect(subject.name).to.equal('test')
  })

  it('has a module', () => {
    expect(subject.module).to.deep.equal({})
  })

  describe('when instantiated with a module object', () => {
    let module

    beforeEach(() => {
      module = {
        state: { foo: 'bar' },
        getters: {
          getter1: td.function()
        },
        actions: {
          action1: td.function()
        }
      }
      subject = new MockModuleWrapper('test', module)
    })

    it('sets module to the given module', () => {
      expect(subject.module).to.deep.equal(module)
    })
  })

  describe('withState', () => {
    describe('when called without a state object', () => {
      beforeEach(() => {
        subject.withState()
      })

      it('creates default state', () => {
        expect(subject.module.state).to.deep.equal({})
      })
    })

    describe('when called with a state object', () => {
      beforeEach(() => {
        subject.withState({ foo: 'bar' })
      })

      it('creates state from the state object', () => {
        expect(subject.module.state).to.deep.equal({ foo: 'bar' })
      })
    })

    describe('chaining', () => {
      describe('withState', () => {
        beforeEach(() => {
          subject.withState({ test1: 'value1' }).withState({ test2: 'value2' })
        })

        it('merges given state with existing state', () => {
          expect(subject.module.state.test1).to.equal('value1')
          expect(subject.module.state.test2).to.equal('value2')
        })
      })

      describe('withGetters', () => {
        describe('when called without a list of getter names', () => {
          beforeEach(() => {
            subject
              .withState()
              .withGetters()
          })

          it('creates a default getters object for the module', () => {
            expect(subject.module.getters).to.deep.equal({})
          })
        })

        describe('when called with a list of getter names', () => {
          beforeEach(() => {
            subject.withState().withGetters(['getter1', 'getter2'])
          })

          it('creates a getters object for the module with stubbed methods', () => {
            subject.module.getters.getter1()
            subject.module.getters.getter2()

            td.verify(subject.module.getters.getter1())
            td.verify(subject.module.getters.getter2())
          })
        })
      })

      describe('withActions', () => {
        describe('when called without a list of action names', () => {
          beforeEach(() => {
            subject
              .withState()
              .withActions()
          })

          it('creates a default actions object for the module', () => {
            expect(subject.module.actions).to.deep.equal({})
          })
        })

        describe('when called with a list of action names', () => {
          beforeEach(() => {
            subject.withState().withActions(['action1', 'action2'])
          })

          it('creates a actions object for the module with stubbed methods', () => {
            subject.module.actions.action1()
            subject.module.actions.action2()

            td.verify(subject.module.actions.action1())
            td.verify(subject.module.actions.action2())
          })
        })
      })
    })
  })

  describe('withGetters', () => {
    describe('when called without getter names', () => {
      beforeEach(() => {
        subject.withGetters()
      })

      it('creates a default getters object', () => {
        expect(subject.module.getters).to.deep.equal({})
      })
    })

    describe('when called with getter names', () => {
      beforeEach(() => {
        subject.withGetters(['getter1', 'getter2'])
      })

      it('creates a getters object with mocked getters', () => {
        subject.module.getters.getter1()
        subject.module.getters.getter2()

        td.verify(subject.module.getters.getter1())
        td.verify(subject.module.getters.getter2())
      })
    })

    describe('chaining', () => {
      describe('withState', () => {
        describe('when called without a state object', () => {
          beforeEach(() => {
            subject.withGetters().withState()
          })

          it('creates a default state object', () => {
            expect(subject.module.state).to.deep.equal({})
          })
        })

        describe('when called with a state object', () => {
          beforeEach(() => {
            subject.withGetters().withState({ test: 'value' })
          })

          it('creates a state object from the given state', () => {
            expect(subject.module.state.test).to.equal('value')
          })
        })
      })

      describe('wthActions', () => {
        describe('when called without action names', () => {
          beforeEach(() => {
            subject.withGetters().withActions()
          })

          it('creates a default actions object', () => {
            expect(subject.module.actions).to.deep.equal({})
          })
        })

        describe('when called with a list of actions', () => {
          beforeEach(() => {
            subject.withGetters().withActions(['action1', 'action2'])
          })

          it('creates a mocked action for each name', () => {
            subject.module.actions.action1()
            subject.module.actions.action2()

            td.verify(subject.module.actions.action1())
            td.verify(subject.module.actions.action2())
          })
        })
      })

      describe('withGetters', () => {
        beforeEach(() => {
          subject.withGetters(['getter1']).withGetters(['getter2'])
        })

        it('merges new getters with existing getters', () => {
          subject.module.getters.getter1()
          subject.module.getters.getter2()

          td.verify(subject.module.getters.getter1())
          td.verify(subject.module.getters.getter2())
        })
      })
    })
  })

  describe('withActions', () => {
    describe('when called without action names', () => {
      beforeEach(() => {
        subject.withActions()
      })

      it('creates a default actions object', () => {
        expect(subject.module.actions).to.deep.equal({})
      })
    })

    describe('when called with action names', () => {
      beforeEach(() => {
        subject.withActions(['action1', 'action2'])
      })

      it('creates a actions object with mocked getters', () => {
        subject.module.actions.action1()
        subject.module.actions.action2()

        td.verify(subject.module.actions.action1())
        td.verify(subject.module.actions.action2())
      })
    })

    describe('chaining', () => {
      describe('withState', () => {
        describe('when called without a state object', () => {
          beforeEach(() => {
            subject.withActions().withState()
          })

          it('creates a default state object', () => {
            expect(subject.module.state).to.deep.equal({})
          })
        })

        describe('when called with a state object', () => {
          beforeEach(() => {
            subject.withActions().withState({ test: 'value' })
          })

          it('creates a state object from the given state', () => {
            expect(subject.module.state.test).to.equal('value')
          })
        })
      })

      describe('withGetters', () => {
        describe('when called without getter names', () => {
          beforeEach(() => {
            subject.withActions().withGetters()
          })

          it('creates a default getters object', () => {
            expect(subject.module.getters).to.deep.equal({})
          })
        })

        describe('when called with a list of getters', () => {
          beforeEach(() => {
            subject.withActions().withGetters(['getter1', 'getter2'])
          })

          it('creates a mocked getter for each name', () => {
            subject.module.getters.getter1()
            subject.module.getters.getter2()

            td.verify(subject.module.getters.getter1())
            td.verify(subject.module.getters.getter2())
          })
        })
      })

      describe('withActions', () => {
        beforeEach(() => {
          subject.withActions(['action1']).withActions(['action2'])
        })

        it('merges new actions with existing actions', () => {
          subject.module.actions.action1()
          subject.module.actions.action2()

          td.verify(subject.module.actions.action1())
          td.verify(subject.module.actions.action2())
        })
      })
    })
  })

  describe('withModule', () => {
    describe('when called with no args', () => {
      beforeEach(() => {
        subject.withModule()
      })

      it('creates a default modules object', () => {
        expect(subject.module.modules).to.deep.equal({})
      })
    })

    describe('when called with a module name and object', () => {
      let module

      beforeEach(() => {
        module = {
          state: { foo: 'bar' },
          getters: {},
          actions: {}
        }

        subject.withModule('test', module)
      })

      it('adds the given module', () => {
        expect(subject.module.modules.test).to.deep.equal(module)
      })
    })

    describe('chaining', () => {
      describe('withState', () => {
        beforeEach(() => {
          subject.withModule().withState({ foo: 'bar' })
        })

        it('adds the state to the root module', () => {
          expect(subject.module.state.foo).to.equal('bar')
        })
      })

      describe('withGetters', () => {
        beforeEach(() => {
          subject.withModule().withGetters(['test'])
        })

        it('adds the getter to the root module', () => {
          subject.module.getters.test()

          td.verify(subject.module.getters.test())
        })
      })

      describe('withActions', () => {
        beforeEach(() => {
          subject.withModule().withActions(['test'])
        })

        it('adds the action to the root module', () => {
          subject.module.actions.test()

          td.verify(subject.module.actions.test())
        })
      })

      describe('withModule', () => {
        let module1, module2

        beforeEach(() => {
          module1 = {
            state: { name: 'module1' }
          }
          module2 = {
            state: { name: 'module2' }
          }
          subject.withModule('module1', module1).withModule('module2', module2)
        })

        it('adds adds the new module to the existing modules', () => {
          expect(subject.module.modules.module1).to.deep.equal(module1)
          expect(subject.module.modules.module2).to.deep.equal(module2)
        })
      })
    })
  })
})
