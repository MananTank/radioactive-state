const getRS = require('./getRS')
const {silentMutate} = require('./mutate')
const afterSync = require('./afterSync')
const isObject = require('./isObject')

/* getOnChange returns an onChange function
 * this onChange function batches all the mutations that take place in RS.current
 * and then calls forceUpdate to trigger a re-render
 */

const getOnChange = (RS, forceUpdate) => {

  const onChange = (chain, value, trap, updateNow) => {
    const addingObject = isObject(value) && trap === 'set'
    const rValue =  addingObject ? getRS(value, onChange, chain) : value
    const success = silentMutate(RS.current, chain, rValue, trap)
    updateNow ? forceUpdate() : afterSync(forceUpdate)
    return success
  }

  return onChange
}

module.exports = getOnChange