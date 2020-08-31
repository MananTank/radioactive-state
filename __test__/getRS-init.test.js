import getRS from '../utils/getRS'

test('entire state can be initialized with a function instead of object', () => {
  const obj = {a: 100}
  const RS = getRS( () => obj)
  expect(RS.a).toBe(100)
})


test('slices of state can be initialized with a function instead of object', () => {

  const RS = getRS({
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