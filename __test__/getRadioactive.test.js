import getRadioactive from '../utils/getRadioactive'

test('shallow mutations on object', () => {
  const obj = { a: 10, b: 30 }

  const onChange = (chain, value) => {
    expect(chain).toEqual(['a'])
    expect(value).toEqual(100)
  }

  const reactive = getRadioactive(obj, onChange)
  reactive.a = 100

  expect(reactive).toEqual(obj) // reactive and obj are equal
})

test('deep mutations on object', () => {
  const obj = {
    a: {
      b: {
        c: {
          d: 10,
          z: {
            x: 10
          }
        },
      },
      x: [1,2,3]
    },
    y: [10, 20, 30]
  }
  const reactive = getRadioactive(obj, (chain, value) => {
    expect(chain).toEqual(['a', 'b', 'c', 'd'])
    expect(value).toEqual(100)
  })

  reactive.a.b.c.d = 100
  expect(reactive).toEqual(obj) // reactive and obj are equal
})

test('shallow mutations on array', () => {
  const arr = [10, 20, 30, 40]
  const reactive = getRadioactive(arr, (chain, value) => {
    expect(chain).toEqual(['3'])
    expect(value).toEqual(100)
  })

  reactive[3] = 100
  expect(reactive).toEqual(arr) // reactive and obj are equal
})

test('deep mutations on array', () => {
  const arr = [10, 20, 30, { a: { b: { c: [10, 20, 30] } } }]
  const reactive = getRadioactive(arr, (chain, value) => {
    expect(chain).toEqual(['3', 'a', 'b', 'c', '2'])
    expect(value).toEqual(100)
  })

  reactive[3].a.b.c[2] = 100
  expect(reactive).toEqual(arr) // reactive and obj are equal
})

test('value types are simply returned as it is', () => {
  expect(getRadioactive(10)).toBe(10)
  expect(getRadioactive(0)).toBe(0)
  expect(getRadioactive(undefined)).toBe(undefined)
  expect(getRadioactive(false)).toBe(false)
  expect(getRadioactive(true)).toBe(true)
  expect(getRadioactive(null)).toBe(null)
  expect(getRadioactive('')).toBe('')
  expect(getRadioactive('some string')).toBe('some string')
})

