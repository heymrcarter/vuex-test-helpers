# Vuex test helpers

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