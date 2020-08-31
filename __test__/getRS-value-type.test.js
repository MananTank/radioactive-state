import getRS from '../utils/getRS'

test('value types are simply returned as it is', () => {
  expect(getRS(10)).toBe(10)
  expect(getRS(0)).toBe(0)
  expect(getRS(undefined)).toBe(undefined)
  expect(getRS(false)).toBe(false)
  expect(getRS(true)).toBe(true)
  expect(getRS(null)).toBe(null)
  expect(getRS('')).toBe('')
  expect(getRS('some string')).toBe('some string')
})
