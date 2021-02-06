const reactify = require('../utils/reactify')

test('objects are made reactive', () => {
  const state = reactify({ })
  expect(state.__isRadioactive__).toBe(true)
})

test('arrays are made reactive', () => {
  const state = reactify([])
  expect(state.__isRadioactive__).toBe(true)
})
