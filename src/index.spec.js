import * as subject from './index'
import MockModuleWrapper from './MockModuleWrapper'
import MockStoreWrapper from './MockStoreWrapper'

describe('index', () => {
  describe('createMockModule', () => {
    let actual

    beforeEach(() => {
      actual = subject.createMockModule()
    })

    it('returns a MockModuleWrapper', () => {
      expect(actual instanceof MockModuleWrapper).to.be.true // eslint-disable-line
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
