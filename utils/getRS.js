/*
 * getRS returns a "radioactive" object
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

// all RS should share the same disableOnChange
let disableOnChange = false

const getRS = (obj, onChange, chain = []) => {
  // non-object types can not be radioactive
  if (typeof obj !== 'object' || obj === null) return obj

  // make wrapper to save reacitified children
  const radioactiveWrapper = Array.isArray(obj) ? [] : {}

  // save reactified children to wrapper
  Object.keys(obj).forEach((key) => {
    radioactiveWrapper[key] = getRS(obj[key], onChange, [...chain, key])
  })

  // then make the object itself radioactive
  return new Proxy(radioactiveWrapper, {


    // for reactive bindings
    get(target, $prop) {

      if ($prop[0] === '$') {
        const prop = $prop.substr(1)
        let key = 'value'
        if (typeof target[prop] === 'boolean') key = 'checked'
        return {
          [key]: target[prop],
          onChange:  e => {
            let value = e.target[key]
            if (typeof target[prop] === 'number') value = Number(value)
            onChange([...chain, prop], value, 'set')
          }
        }
      }
      return Reflect.get(target, $prop)
    },

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

export default getRS
