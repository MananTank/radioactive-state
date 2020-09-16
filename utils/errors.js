import isObject from './isObject'

export const checkInitialState = initialState => {
  const msg = `Invalid initial state: Expected a reference type, Got "${initialState}" instead.\n` +
  'useRS() hook takes a reference type as an argument, such as object/array ' +
  'OR a function that returns an object/array.'

  if (!isObject(initialState)) {
    if (process.env.NODE_ENV !== 'production') throw new Error(msg)
    else console.error(msg)
  }
}

