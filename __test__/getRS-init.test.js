const reactify = require('../utils/reactify')

test('entire state can be initialized with a function instead of object', () => {
  const obj = {a: 100}
  const RS = reactify( () => obj)
  expect(RS.a).toBe(100)
})


test('slices of state can be initialized with a function instead of object', () => {

  const RS = reactify({
    a: 100,
    b: () => 200,
    c: {
      d: 300,
      e: () => 400
    }
  })
  expect(RS.a).toBe(100)
  expect(RS.b).toBe(200)
  expect(RS.c.e).toBe(400)
})