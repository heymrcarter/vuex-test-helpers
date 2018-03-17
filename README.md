# Vuex test helpers

![build-status](https://heymrcarter.visualstudio.com/_apis/public/build/definitions/a15db74e-6404-4bad-9ac6-1a85e3a155a4/17/badge)

[![NPM](https://nodei.co/npm/<package>.png?mini=true)](https://npmjs.org/package/vuex-test-helpers)

> A helper library to construct mock Vuex stores for tests

## Installation 

```terminal
$ npm install -D vuex-test-helpers
```

## Dependencies

Vuex test helpers currently requires [testdouble.js](https://github.com/testdouble/testdouble.js). Vuex test helpers uses `td.function()` to create mock actions and getters. You should install testdouble as a dev dependency in your project as well.

## Example usage

Let's say we have a Vue component, MyComponent, that uses state data and an action from a Vuex store:

`myComponent.vue`

```html
<template>
  <div>
    <h1>{{ message }}</h1>

    <button @click="loadData" id="fetch">Load awesome data!</button>

    <div v-if="superAwesomeData" id="super-awesome-data">
      {{ superAwesomeData }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'MyModule',
  data() {
    return {
      superAwesomeData: undefined
    }
  },
  computed: {
    ...mapState(['message'])
  },
  methods: {
    ...mapActions(['fetchData']),
    loadData() {
      this.fetchData()
        .then(data => {
          this.superAwesomeData = data
        })
    }
  }
}
</script>
```

`MyComponent.spec.js`

```js
import MyComponent from '@/components/MyComponent'
import { shallow, createLocalVue } from '@vue/test-utils',
import { createMockStore } from 'vuex-test-helpers'
import Vuex from 'vuex'

describe('MyComponent', () => {
  let wrapper, subject, store

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    { store } = createMockStore()
      .withState({ message: 'Hello world!' })
      .withActions(['fetchData'])

    wrapper = shallow(MyComponent, {
      localVue,
      store: new Vuex.Store(store)
    })

    subject = wrapper.vm
  })

  it('renders the message from the store', () => {
    expect(wrapper.find('h1').text()).to.equal('Hello world!')
    expect
  })

  describe('when the fetch button is clicked', () => {
    beforeEach(() => {
      td.when(store.actions.fetchData()).thenResolve('the super awesome data')
      wrapper.find('#fetch').trigger('click')
    })

    it('renders the response', () => {
      expect(wrapper.find('#super-awesome-data').text()).to.equal('the super awesome data')
    })
  })
})
```

## API

* [createMockStore](#createMockStore)
  * [withState](#createMockStore_withState)
  * [withGetters](#createMockStore_withGetters)
  * [withActions](#ccreateMockStore_withActions)
  * [withModule](#createMockStore_withModule)

* [createMockModule](#createMockStore)
  * [withState](#createMockStore_withState)
  * [withGetters](#createMockStore_withGetters)
  * [withActions](#ccreateMockStore_withActions)
  * [withModule](#createMockStore_withModule)

<h3 id="createMockStore"><code>createMockStore() : Returns MockStoreWrapper</code></h3> 

Returns a `MockStoreWrapper` object which can be used to build a mock store.

```js
const mockStore = createMockStore().store
```

<h4 id="createMockStore_withState"><code>withState(state: Object) : Returns MockStoreWrapper</code></h4>

Updates the working store with the given state object. If no state is provided, the store will default state to an empty object.

Returns a `MockStoreWrapper` so all methods are chainable.

```js
const mockStore = createMockStore().withState({foo: 'bar'})

console.log(mockStore.store.state) // { foo: 'bar' }
```

<h4 id="createMockStore_withGetters"><code>withGetters(getters: Array) : Returns MockStoreWrapper</code></h4>

Updates the working store with mock getters. If no getters are provided, the store will create a default empty getters object.

Returns a `MockStoreWrapper` so all methods are chainable.

```js
const mockStore = createMockStore().withGetters(['myGetter'])

// in a spec
td.when(mockStore.store.getters.myGetter()).thenReturn('my getter value')

// in a view component that has mapped myGetter
console.log(this.myGetter) // my getter value
```

<h4 id="createMockStore_withActions"><code>withActions(actions: Array) : Returns MockStoreWrapper</code></h4>

Updates the working store with mock actions. If no actions are provided, the store will create a default empty actions object.

Returns a `MockStoreWrapper` so all methods are chainable.

```js
const mockStore = createMockStore().withActions(['myAction'])

// in a spec
td.when(mockStore.store.actions.myAction()).thenResolve('my action result')

// in a view component that has mapped myAction
this.myAction().then(result => {
  console.log(result) // my action result
})
```

<h4 id="createMockStore_withModule"><code>withModule(name: String, module: Object) : Returns MockStoreWrapper</code></h4>

Adds a module with the given name to the working store. If no name is provider a default, empty modules object is created. Use this method to add modules created with [`createMockModule`](#createMockModule) to your store.

Returns a `MockStoreWrapper` so all methods are chainable.

```js
const testModule = createMockModule('test').withState({foo: 'bar'})
const mockStore = createMockStore().withModule(testModule.name, testModule.module)
console.log(mockStore.store.modules) // { test: { state: { foo: 'bar' } } }
```

<h3 id="createMockModule"><code>createMockModule(name: String) : Returns MockModuleWrapper</code></h3>

Returns a `MockModuleWrapper` object which can be used to build a mock module.

```js
const mockModule = createMockModule('test')
console.log(mockModule.name) // test
console.log(mockModule.module) // {}
```

<h4 id="createMockModule_withState"><code>withState(state : Object) : Returns MockModuleWrapper</code></h4>

Updates the modules state with the given object. If no object is provided a default empty object is created.

Returns a `MockModuleWrapper` so all methods are chainable.

```js
const testModule = createMockModule('test').withState({foo: 'bar'})
console.log(testModule.module.state) // { foo: 'bar' }
```

<h4 id="createMockModule_withGetters"><code>withGetters(getters : Array) : Returns MockModuleWrapper</code></h4>

Creates mocked getters for the module. If no getters are provided a default empty getters object is created.

Returns a `MockModuleWrapper` so all methods are chainable.

```js
const mockModule = createMockModule('test').withGetters(['myGetter'])

// in a spec
td.when(mockModule.module.getters.myGetter()).thenReturn('my getter value')

// in a view component that has mapped myGetter from the test module
console.log(this.myGetter) // my getter value
```

<h4 id="createMockModule_withActions"><code>withActions(actions : Array) : Returns MockModuleWrapper</code></h4>

Creates mocked actions for the module. If no actions are provided a default empty actions object is created.

Returns a `MockModuleWrapper` so all methods are chainable.

```js
const mockModule = createMockModule('test').withActions(['myAction'])

// in a spec
td.when(mockModule.module.actions.myAction()).thenResolve('my action result')

// in a view component that has mapped myAction from the test module
this.myAction().then(result => {
  console.log(result) // my action result
})
```

<h4 id="createMockModule_withModule"><code>withModule(name: String, module: Object) : Returns MockModuleWrapper</code></h4>

Adds a module with the given name to the current module. If no name is provider a default, empty modules object is created. You can use this method to create store structures that have nested modules infitely deep.

Returns a `MockModuleWrapper` so all methods are chainable.

```js
const testModule = createMockModule('test').withState({foo: 'bar'})
const nestedModule = createMockModule('nested').withState({ nested: 'state' })

testModule.withModule(nestedModule.name, nestedModule.module)
console.log(testModule.module)
// {
//   state: { foo: 'bar' },
//   modules: {
//     nested: {
//       state: { nested: 'state' }
//     }
//   }
// }
```
