const reactify = require('../utils/reactify')

test('slices of state can be initialized with a function instead of object', () => {
  const state = reactify({
    a: 100,
    b: () => 200,
    c: {
      d: 300,
      e: () => 400
    }
  }, jest.fn())

  expect(state.a).toBe(100)
  expect(state.b).toBe(200)
  expect(state.c.e).toBe(400)
})