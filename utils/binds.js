// check if the given key exists in the object
// if not, throw error using the function where the error originated
const checkForKey = (key, state, fnName) => {
  if (typeof state !== 'object' || !state.hasOwnProperty(key)) {
    throw new Error(
      `${fnName}() expected an object with key "${key}", `
				+ `but got "${JSON.stringify(state)}" instead.`,
    )
  }
}


// bind the given object's 'value' prop to value
// and onChange, save the new value to object's 'value' prop from event
// convert the value to number if the e.target's type is either range or number
export const bindValue = (state) => {
  checkForKey('value', state, 'bindValue')
  return {
    value: state.value,
    onChange: (e) => {
      const { type } = e.target
      let value = e.target.value
      if (type === 'number' || type === 'range') value = Number(value)
      state.value = value
    },
  }
}

// bind the value of input's checked state to state's checked prop
// onChange, save the new value to state as well
export const bindChecked = (state) => {
  checkForKey('checked', state, 'bindChecked')
  return {
    checked: state.checked,
    type: 'checkbox',
    onChange: (e) => {
      state.checked = e.target.checked
    },
  }
}

// when an input radio or checkbox is part of a group and we want to save the checked ones bindGroup is used
// value is the value of given input
// state holds the selected values
export const bindGroup = (value, state) => {
  // if the state's value is an array, value must be in that array for this to be checked
  // if the state's value is a single value, value must be that value for this to be checked
  const checked = Array.isArray(state.value)
    ? state.value.includes(value) : state.value === value

  return {
    value,
    checked,
    onChange: (e) => {
      const { checked } = e.target

      if (e.target.type === 'checkbox') {
        // for checkbox
        if (checked) {
          state.value.push(value)
        } else {
          const index = state.value.findIndex((v) => v === value)
          state.value.splice(index, 1)
        }
      } else {
        // for radio
        const { checked } = e.target
        if (checked) state.value = value
      }
    },
  }
}
