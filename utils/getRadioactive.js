/*
 * getRadioactive returns a "radioactive" object
 * whenever any of it's key or any of it's children's key is mutated, onChange is called
 * onChange is called with (chain, value, trap)
 * chain is basically full 'patch' where the mutation took place
 *
 * For Example:
 *
 * * obj.a.b.c.d[2] = 100
 * * chain : ['a', 'b', 'c', 'd', '2']
 * * value : 100
 * * trap : 'set'
 */

const getRadioactive = (obj, onChange, chain = []) => {
  // non-object types can not be reactive
  if (typeof obj !== 'object' || obj === null) return obj

  // make wrapper to save reacitified children
  const reactiveWrapper = Array.isArray(obj) ? [] : {}

  // save reactified children to wrapper
  Object.keys(obj).forEach((key) => {
    reactiveWrapper[key] = getRadioactive(obj[key], onChange, [...chain, key])
  })

  let ignoreMode = false

  // then make the object itself reactive
  const reactive = new Proxy(reactiveWrapper, {

    set(target, prop, value) {
      if (typeof target !== 'object') return false
      if (prop === '__ignoreMode__') ignoreMode = value
      else {
        if (ignoreMode) return Reflect.set(target, prop, value)
        else onChange([...chain, prop], value, 'set', ignoreMode)
      }
      return true
    },

    deleteProperty(target, prop) {
      if (typeof target !== 'object') return false
      if (ignoreMode) return Reflect.deleteProperty(target, prop)
      if (target.hasOwnProperty(prop)) {
        onChange([...chain, prop], undefined, 'deleteProperty')
        return true
      }
      return false
    },
  })

  return reactive
}

export default getRadioactive
