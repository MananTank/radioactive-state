const inputBinding = (prop, target, forceUpdate) => {
  const actualProp = prop.substring(1)
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
        Reflect.set(target, actualProp, value)
        forceUpdate()
      }
    }

    return binding
  }
}

module.exports = inputBinding