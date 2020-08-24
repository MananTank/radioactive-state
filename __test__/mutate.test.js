import mutate from '../utils/mutate'

test('shallow mutations (set) on object', () => {
  const obj = {
    a: 100,
    b: 200
  }

  // obj.a = 1000
  mutate(obj, ['a'], 1000, 'set')

  expect(obj).toEqual({ a: 1000, b: 200})
})


test('deep mutations on (set) object', () => {
  const obj = {
    a: 100,
    b: {
      c: {
        d: 0
      }
    }
  }

  // obj.b.c.d = 1000
  mutate(obj, ['b', 'c', 'd'], 1000, 'set')

  expect(obj).toEqual({
    a: 100,
    b: {
      c: {
        d: 1000
      }
    }
  })
})


test('shallow mutations on array (set)', () => {
  const arr = [10, 20, 30]
  mutate(arr, ['2'], 1000, 'set' )

  // arr[2] = 1000
  expect(arr).toEqual([10, 20, 1000])
})


test('deep mutations on array (set)', () => {
  const arr = [10, 20, [ 10, 20, 30, 40, [1, 2, 3]]]
  mutate(arr, ['2', '4', '0'], 1000, 'set' )

  // arr[2][4][0] = 1000
  expect(arr).toEqual([10, 20, [ 10, 20, 30, 40, [1000, 2, 3]]])
})


test('throw error when trying to add key to a non-object type', () => {
  const obj = { a : 100 }
  // obj.a = 1000
  expect( () => {
    // obj.a.b = 1000
    mutate(obj, ['a', 'b'], 1000, 'set')
  }).toThrow()

})