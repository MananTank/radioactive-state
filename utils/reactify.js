const isObject = require('./isObject')
const inputBinding = require('./inputBinding')
const schedule = require('./schedule')

const reactify = (_state, forceUpdate, path = []) => {
  const state = typeof _state === 'function' ? _state() : _state
  if (!isObject(state)) return state

  // make all children radioactive and save it in a wrapper
  const wrapper = Array.isArray(state) ? [] : {}
  Object.keys(state).forEach((key) => {
    wrapper[key] = reactify(state[key], forceUpdate, [...path, key])
  })

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
      // return original target
      if (prop === '__target__') return target

      if (prop === '__isRadioactive__') return true

      // mutation flag API
      if (prop === '$') return mutations

      // input binding API
      if (prop[0] === '$') return inputBinding(prop, target, forceUpdate)

      else return Reflect.get(target, prop)
    },

  })
}

module.exports = reactify
