import getRS from '../utils/getRS'


test('key __disableOnChange__ returns a function', () => {
  const onChange = () => true
  const RS = getRS({}, onChange)
  expect( typeof RS.__disableOnChange__ ).toBe('function')
})

// REACTIVE BINDINGS FOR INPUTS ----------------------------




describe('reactive bindings', () => {

  const onChange = () => true
  const obj = {a: 10, x: '', y: true}
  const RS = getRS(obj, onChange)

  test('$key returns a binding containing value and onChange for initial value string or number', () => {
    const binding = RS.$a
    expect(typeof binding).toBe('object')
    expect('value' in binding).toBe(true)
    expect('onChange' in binding).toBe(true)

    const binding2 = RS.$x
    expect(typeof binding2).toBe('object')
    expect('value' in binding2).toBe(true)
    expect('onChange' in binding2).toBe(true)
  })

  test('$key returns a binding containing checked and onChange for initial value boolean', () => {
    const binding = RS.$y
    expect(typeof binding).toBe('object')
    expect('checked' in binding).toBe(true)
    expect('onChange' in binding).toBe(true)
  })

  test('$key returns undefined if key does not exists in state', () => {
    const binding = RS.$b
    expect(binding).toBe(undefined)
  })

  test('if the initial value of key is a number, onChange converts the e.target.value to number', () => {
    const onChange = (_, value) => {
      expect(value).toBe(1000)
    }
    const RS = getRS({ a: 10}, onChange)
    RS.$a.onChange({target: {value: '1000'}})
  })

  test('if the initial value of key is a boolean, onChange usee the e.target.checked value to set the state', () => {
    const onChange = (_, value) => {
      expect(value).toBe(false)
    }
    const RS = getRS({ x: true}, onChange)
    const binding = RS.$x
    expect(binding.checked).toBe(true)
    binding.onChange({target: {checked: false}})
  })

})



