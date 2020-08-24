import { useState, useRef } from 'react'
import getRadioactive from './utils/getRadioactive'
import getOnChange from './utils/getOnChange'
import {checkInitialState} from './utils/errors'


const useRS = initialState => {
  const [state, setState] = useState(initialState)
  const radioactive = useRef()
  if (radioactive.current) return radioactive.current

  checkInitialState(initialState)
  const onChange = getOnChange(radioactive, state, setState)

  // when the state changes, make new radioactive state from the new state and return it
  radioactive.current = getRadioactive(state, onChange)
  return radioactive.current
}

export default useRS
export * from './utils/binds'

