const reactify = require('../utils/reactify')

test('state.$ is incremented when object state is mutated', () => {
  const state = reactify({ a: 0 }, jest.fn())
  expect(state.$).toBe(0)
  state.a++
  expect(state.$ > 0).toBe(true)
})

test('state.$ is incremented when array state is mutated', () => {
  const state = reactify([200], jest.fn())
  expect(state.$).toBe(0)
  state.push(100)
  expect(state.$ > 0).toBe(true)
})