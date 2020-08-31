import { useRef, useReducer } from 'react'
import getRS from './utils/getRS'
import getOnChange from './utils/getOnChange'
import {checkInitialState} from './utils/errors'

const inc = x => x + 1

const useRS = arg => {
  const [, forceUpdate] = useReducer(inc, 0)
  const RS = useRef()

  // when running this hook for the first time
  if (!RS.current) {
    const initialState = typeof arg === 'function' ? arg() : arg
    checkInitialState(initialState)
    const onChange = getOnChange(RS, forceUpdate)
    RS.current = getRS(initialState, onChange)
  }

  return RS.current
}

export default useRS

