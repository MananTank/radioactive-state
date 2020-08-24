import { useRef, useReducer } from 'react'
import getRS from './utils/getRS'
import {silentMutate} from './utils/mutate'
import {checkInitialState} from './utils/errors'
import afterSync from './utils/afterSync'


const useRS = initialState => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const RS = useRef()

  // when running this hook for the first time
  if (!RS.current) {
    checkInitialState(initialState)
    const timer = { set: false }

    const onChange = (...args) => {
      const success = silentMutate(RS.current, ...args)
      if (!timer.set) afterSync(forceUpdate, timer)
      return success
    }

    RS.current = getRS(initialState, onChange)
  }

  return RS.current
}

export default useRS
export * from './utils/binds'


// forceUpdate is called not for all onChange, but after all onChanges are called
// this is because onChange may be called multiple times for a single mutation
// calling forceUpdate after all the sync code has executed, essentailly batches all of them into one