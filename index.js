import { useRef, useReducer } from 'react'
import getRadioactive from './utils/getRadioactive'
import mutate from './utils/mutate'
import {checkInitialState} from './utils/errors'
import afterSync from './utils/afterSync'

const useRS = initialState => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const radioactive = useRef()

  // when running this hook for the first time
  if (!radioactive.current) {
    checkInitialState(initialState)
    const timer = { set: false }

    const onChange = (chain, value, trap) => {
      radioactive.current.__disableOnChange__ = true
      const success = mutate(radioactive.current, chain, value, trap)
      radioactive.current.__disableOnChange__ = false

      // call forceUpdate only once, after all the sync code is done executing
      if (!timer.set) afterSync(forceUpdate, timer)

      return success
    }

    radioactive.current = getRadioactive(initialState, onChange)
  }

  return radioactive.current
}

export default useRS
export * from './utils/binds'

