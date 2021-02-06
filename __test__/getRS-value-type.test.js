const reactify = require('../utils/reactify')

test('value types are simply returned as it is', () => {
  expect(reactify(10)).toBe(10)
  expect(reactify(0)).toBe(0)
  expect(reactify(undefined)).toBe(undefined)
  expect(reactify(false)).toBe(false)
  expect(reactify(true)).toBe(true)
  expect(reactify(null)).toBe(null)
  expect(reactify('')).toBe('')
  expect(reactify('some string')).toBe('some string')
})
