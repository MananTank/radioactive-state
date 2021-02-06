const { useRef, useReducer } = require('react')
const getRS = require('./utils/getRS')
const getOnChange = require('./utils/getOnChange')
const {checkInitialState} = require('./utils/errors')

const useRS = arg => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const RS = useRef()

  // when running this hook for the first time in a component
  if (!RS.current) {
    const initialState = typeof arg === 'function' ? arg() : arg
    checkInitialState(initialState)
    const onChange = getOnChange(RS, forceUpdate)
    RS.current = getRS(initialState, onChange)
  }

  return RS.current
}

module.exports = useRS