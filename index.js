const { useRef, useReducer } = require('react')
const reactify = require('./utils/reactify')
const {checkInitialState} = require('./utils/errors')

const useRS = arg => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const RS = useRef()

  // when running this hook for the first time in a component
  if (!RS.current) {
    const initialState = typeof arg === 'function' ? arg() : arg
    checkInitialState(initialState)
    RS.current = reactify(initialState, forceUpdate)
  }

  return RS.current
}

module.exports = useRS