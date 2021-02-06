const reactify = require('../utils/reactify')

test('state value is updated directly after mutation', () => {
  const forceUpdate = jest.fn()
  const state = reactify({ count: 0 },forceUpdate)
  expect(state.count).toBe(0)
  state.count++
  expect(state.count).toBe(1)
})