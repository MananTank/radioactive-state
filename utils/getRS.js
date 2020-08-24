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

  let disableOnChange = false

  // then make the object itself reactive
  return new Proxy(reactiveWrapper, {

    set(target, prop, value) {
      if (prop === '__disableOnChange__') {
        disableOnChange = value
        return true
      }
      else {
        if (disableOnChange) return Reflect.set(target, prop, value)
        return onChange([...chain, prop], value, 'set')
      }
    },

    deleteProperty(target, prop) {
      if (disableOnChange) return Reflect.deleteProperty(target, prop)
      return onChange([...chain, prop], undefined, 'deleteProperty')
    },
  })
}

export default getRadioactive
