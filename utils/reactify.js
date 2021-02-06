const isObject = require('./isObject')
const inputBinding = require('./inputBinding')
const schedule = require('./schedule')
const unwrap = require('./unwrap')
const unReactify = require('./unReactify')

const reactify = (state, forceUpdate, path = []) => {

  // recursively make all slices of state reactive
  const wrapper = Array.isArray(state) ? [] : {}
  Object.keys(state).forEach(key => {
    let slice = state[key]
    slice = unwrap(slice)
    wrapper[key] = isObject(slice) ? reactify(slice, forceUpdate, [...path, key]) : slice
  })

  // counter that keeps track how many times state is mutated
  let mutations = 0

  // make the wrapper radioactive
  return new Proxy(wrapper, {

    set(target, prop, value) {
      const addingNonReactiveObject = isObject(value) && !value.__isRadioactive__
      const $value = addingNonReactiveObject ? reactify(value, forceUpdate, [...path, prop]) : value

      // if new value and old value are not same
      if (target[prop] !== $value) {
        schedule(forceUpdate)
        mutations++
      }

      return Reflect.set(target, prop, $value)
    },

    deleteProperty(target, prop) {
      schedule(forceUpdate)
      mutations++
      return Reflect.deleteProperty(target, prop)
    },

    get(target, prop) {
      if (prop === '__target__') return unReactify(target)
      if (prop === '__isRadioactive__') return true
      // mutation count
      if (prop === '$') return mutations
      // inputBinding
      if (prop[0] === '$') return inputBinding(prop, target, forceUpdate)
      else return Reflect.get(target, prop)
    },

  })
}

module.exports = reactify
