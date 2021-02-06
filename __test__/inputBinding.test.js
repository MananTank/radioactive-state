const reactify = require('../utils/reactify')

// REACTIVE BINDINGS FOR INPUTS ----------------------------
describe('reactive bindings', () => {

  let forceUpdate, arg, state
  beforeEach(() => {
    forceUpdate = jest.fn()
    arg = {age: 10, name: 'some name', loggedIn: true}
    state = reactify(arg, forceUpdate)
  })

  test('state.$key returns {value, onChange} if state.key is number', () => {
    const binding = state.$age
    expect('value' in binding).toBe(true)
    expect('onChange' in binding).toBe(true)
  })

  test('state.$key returns {value, onChange} if state.key is string', () => {
    const binding = state.$name
    expect('value' in binding).toBe(true)
    expect('onChange' in binding).toBe(true)
  })

  test('state.$key returns {checked, onChange} if state.key is boolean', () => {
    const binding = state.$loggedIn
    expect('checked' in binding).toBe(true)
    expect('onChange' in binding).toBe(true)
  })

  test('state.$key returns undefined if state.key is undefined', () => {
    expect(state.$foo).toBe(undefined)
  })

  test('state.$key.onChange converts the e.target.value to number, if state.key is number', () => {
    state.$age.onChange({target: {value: '1000'}})
    expect(state.age).toBe(1000)
  })

  test('state.$key.onChange uses the e.target.checked value to set the state if state.key is boolean', () => {
    state.$loggedIn.onChange({target: {checked: false}})
    expect(state.loggedIn).toBe(false)
  })

  test('forceUpdate is called synchronously when state is mutated using the inputBinding API', () => {
    const event = {target: {value: 500}}
    state.$age.onChange(event)
    expect(forceUpdate).toHaveBeenCalled()
    expect(state.age).toBe(500)
  })

})



