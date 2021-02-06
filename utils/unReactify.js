const isObject = require('./isObject')

const unReactify = (state) => {
  if (!isObject(state)) return state
  const target = Array.isArray(state) ? [] : {}
  Object.keys(state).forEach(k => {
    target[k] = unReactify(state[k])
  })
  return target
}

module.exports = unReactify