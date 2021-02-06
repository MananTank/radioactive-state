const getRS = require('./getRS')
const {silentMutate} = require('./mutate')
const schedule = require('./schedule')
const isObject = require('./isObject')

/* getOnChange returns an onChange function
 * this onChange function batches all the mutations that take place in RS.current
 * and then calls forceUpdate to trigger a re-render
 */

const getOnChange = (RS, forceUpdate) => {

  const onChange = (chain, value, trap, updateNow) => {
    // if a new object is added and it's not reactive, it needs to be made reactive
    const addingObject = isObject(value) && trap === 'set'
    const addingNonReactiveObject = addingObject && !value.__isRadioactive__
    const reactiveValue = addingNonReactiveObject ? getRS(value, onChange, chain) : value

    // mutate the target
    const success = silentMutate(RS.current, chain, reactiveValue, trap)

    // schedule re-render
    updateNow ? forceUpdate() : schedule(forceUpdate)

    // return validity of mutation
    return success
  }

  return onChange
}

module.exports = getOnChange