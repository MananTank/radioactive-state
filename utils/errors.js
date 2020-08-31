export const checkInitialState = initialState => {

  const msg = 'useRadioActive() hook takes object types as argument, such as object or array.\n' +
    'Wrap the value in an object to fix this error'

  if (typeof initialState !== 'object' && initialState !== null) {
    if (process.env.NODE_ENV !== 'production') throw new Error(msg)
    else console.error(msg)
  }
}

