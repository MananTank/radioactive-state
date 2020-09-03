export const checkInitialState = initialState => {
  const msg = `Invalid Initial State: Expected a reference type, but got "${initialState}" instead.\n` +
  'useRS() hook takes a reference type as an argument, such as object/array ' +
  'OR a function that returns an object/array.'

  if (typeof initialState !== 'object' && initialState !== null) {
    if (process.env.NODE_ENV !== 'production') throw new Error(msg)
    else console.error(msg)
  }
}

