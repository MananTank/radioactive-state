
export const checkInitialState = initialState => {
  if (typeof initialState !== 'object') {
    throw new Error(
      'useRadioActive() hook takes object types as argument, such as object or array.\n' +
				'Wrap the value in an object to fix this error'
    )
  }
}