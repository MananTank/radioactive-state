import { useRef, useReducer } from 'react'
import getRS from './utils/getRS'
import getOnChange from './utils/getOnChange'
import {checkInitialState} from './utils/errors'


const useRS = initialState => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const RS = useRef()

  // when running this hook for the first time
  if (!RS.current) {
    checkInitialState(initialState)
    const onChange = getOnChange(RS, forceUpdate)
    RS.current = getRS(initialState, onChange)
  }

  return RS.current
}

export default useRS
export * from './utils/binds'

