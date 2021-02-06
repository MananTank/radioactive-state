const isObject = require('./isObject')

const checkInitialState = initialState => {
  if (!isObject(initialState)) throw new Error(`Invalid State "${initialState}" provided to useRS() hook, it must be either an object/array or a function that returns an object/array`)
}

module.exports = {
  checkInitialState
}