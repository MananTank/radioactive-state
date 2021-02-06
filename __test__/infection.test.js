const reactify = require('../utils/reactify')

test('Newly added object in the state also becomes reactive', async () => {

  const forceUpdate = jest.fn()
  const state = reactify({ }, forceUpdate)

  state.x = { y: {z: 100} }
  expect(state.x.__isRadioactive__).toBe(true)
  expect(state.x.y.__isRadioactive__).toBe(true)
})