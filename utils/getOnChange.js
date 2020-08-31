import getRS from './getRS'
import {silentMutate} from './mutate'
import afterSync from './afterSync'

// forceUpdate is called not for all onChange, but after all onChanges are called
// this is because onChange may be called multiple times for a single mutation
// calling forceUpdate after all the sync code has executed, essentially batches all of them into one

const getOnChange = (RS, forceUpdate) => {
  const timer = { set: false }
  const onChange = (chain, value, trap) => {
    // if adding an object, make it radioactive
    const rValue = (typeof value === 'object' && trap === 'set') ? getRS(value, onChange, chain) : value
    const success = silentMutate(RS.current, chain, rValue, trap)
    if (!timer.set) afterSync(forceUpdate, timer)
    return success
  }

  return onChange
}

export default getOnChange