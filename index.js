import { useRef, useReducer } from 'react'
import getRS from './utils/getRS'
import getOnChange from './utils/getOnChange'
import {checkInitialState} from './utils/errors'

const useRS = arg => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const RS = useRef()

  // when running this hook for the first time
  if (!RS.current) {
    let initialState = arg
    if (typeof initialState === 'function') {
      initialState = arg()
    }
    checkInitialState(initialState)
    const onChange = getOnChange(RS, forceUpdate)
    RS.current = getRS(initialState, onChange)
  }

  return RS.current
}

export default useRS
// export * from './utils/binds'

