const { useRef, useReducer } = require('react')
const reactify = require('./utils/reactify')
const {checkInitialState} = require('./utils/errors')
const unwrap = require('./utils/unwrap')

const useRS = arg => {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const ref = useRef()

  // when running this hook for the first time in a component
  if (!ref.current) {
    const initialState = unwrap(arg)
    checkInitialState(initialState)
    ref.current = reactify(initialState, forceUpdate)
  }

  return ref.current
}

module.exports = useRS