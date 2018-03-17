import * as subject from './index'
import MockModuleWrapper from './MockModuleWrapper'
import MockStoreWrapper from './MockStoreWrapper'

describe('index', () => {
  describe('createMockModule', () => {
    let actual

    describe('when called without a name', () => {
      it('throws an error', () => {
        expect(() => subject.createMockModule()).to.throw('a module name is required when creating a mock module')
      })
    })

    describe('happy path', () => {
      beforeEach(() => {
        actual = subject.createMockModule('test')
      })

      it('returns a MockModuleWrapper', () => {
        expect(actual instanceof MockModuleWrapper).to.be.true // eslint-disable-line
      })

      it('creates the MockModuleWrapper with the specified name', () => {
        expect(actual.name).to.equal('test')
      })

      describe('when created with options', () => {
        beforeEach(() => {
          actual = subject.createMockModule('test', { namespaced: true })
        })

        it('uses the options object to create the module', () => {
          expect(actual.module.namespaced).to.be.true // eslint-disable-line
        })
      })
    })
  })

  describe('createMockStore', () => {
    let actual

    beforeEach(() => {
      actual = subject.createMockStore()
    })

    it('returns a MockStoreWrapper', () => {
      expect(actual instanceof MockStoreWrapper).to.be.true // eslint-disable-line
    })
  })
})
