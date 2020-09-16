import getRS from './getRS'
import {silentMutate} from './mutate'
import afterSync from './afterSync'
import isObject from './isObject'

/* getOnChange returns an onChange function
 * this onChange function batches all the mutations that take place in RS.current
 * and then calls forceUpdate to trigger a re-render
 */

const getOnChange = (RS, forceUpdate) => {
  const timer = { set: false }

  const onChange = (chain, value, trap, now) => {
    const addingObject = isObject(value) && trap === 'set'
    const rValue =  addingObject ? getRS(value, onChange, chain) : value
    const success = silentMutate(RS.current, chain, rValue, trap)
    if (now) forceUpdate()
    else if (!timer.set) afterSync(forceUpdate, timer)
    return success
  }

  return onChange
}

export default getOnChange