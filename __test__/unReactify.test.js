const reactify = require('../utils/reactify')

test('state.__target__ returns the non-reactive version of state', () => {
  const original = {
    a: {
      b: [10, 20, 30, { c: 1000 }]
    }
  }
  const state = reactify(original)
  const target = state.__target__
  expect(target).toEqual(original)
  expect(target.__isRadioactive__).toBe(undefined)
  expect(target.a.__isRadioactive__).toBe(undefined)
  expect(target.a.b.__isRadioactive__).toBe(undefined)
  expect(target.a.b[3].__isRadioactive__).toBe(undefined)
})