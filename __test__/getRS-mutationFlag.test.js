const reactify = require('../utils/reactify')
const getOnChange = require('../utils/getOnChange')

test('$ is incremented when state (object) is mutated', () => {

  const RS = { current: null }
  RS.current = reactify({ a: 0 }, getOnChange(RS, () => {}))
  const state = RS.current

  expect(state.$).toBe(0)
  state.a++
  expect(state.$ > 0).toBeTruthy()
})


test('$ is incremented when state (array) is mutated', () => {

  const RS = { current: null }
  RS.current = reactify([200], getOnChange(RS, () => {}))
  const state = RS.current

  expect(state.$).toBe(0)
  state.push(100)
  expect(state.$ > 0).toBeTruthy()
})