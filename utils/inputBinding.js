const inputBinding = (prop, target, chain, onChange) => {
  const actualProp = prop.substr(1)
  if (target.hasOwnProperty(actualProp)) {

    let key = 'value'
    const propType = typeof target[actualProp]
    if (propType === 'boolean') {
      key = 'checked'
    }

    const binding =  {
      [key]: target[actualProp],
      onChange: e => {
        let value = e.target[key]
        if (propType === 'number') value = Number(value)
        // to prevent cursor jumping to end, call forceUpdate now !
        onChange([...chain, actualProp], value, 'set', true)
      }
    }

    return binding
  }
}

export default inputBinding