import getRS from '../utils/getRS'

test('shallow mutations on object', () => {
  const obj = { a: 10, b: 30 }

  const onChange = (chain, value, trap) => {
    expect(chain).toEqual(['a'])
    expect(value).toEqual(100)
    expect(trap).toEqual('set')
    return true
  }

  const radioactive = getRS(obj, onChange)
  radioactive.a = 100

  expect(radioactive).toEqual(obj) // radioactive and obj are equal
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

  const onChange = (chain, value, trap) => {
    expect(chain).toEqual(['a', 'b', 'c', 'd'])
    expect(value).toEqual(100)
    expect(trap).toEqual('set')
    return true
  }

  const radioactive = getRS(obj, onChange)

  radioactive.a.b.c.d = 100
  expect(radioactive).toEqual(obj) // radioactive and obj are equal
})

test('shallow mutations on array', () => {
  const arr = [10, 20, 30, 40]

  const onChange = (chain, value, trap) => {
    expect(chain).toEqual(['3'])
    expect(value).toEqual(100)
    expect(trap).toEqual('set')
    return true
  }

  const radioactive = getRS(arr, onChange)

  radioactive[3] = 100
  expect(radioactive).toEqual(arr) // radioactive and obj are equal
})

test('deep mutations on array', () => {
  const arr = [10, 20, 30, { a: { b: { c: [10, 20, 30] } } }]

  const onChange = (chain, value, trap) => {
    expect(chain).toEqual(['3', 'a', 'b', 'c', '2'])
    expect(value).toEqual(100)
    expect(trap).toEqual('set')
    return true
  }

  const radioactive = getRS(arr, onChange)

  radioactive[3].a.b.c[2] = 100
  expect(radioactive).toEqual(arr) // radioactive and obj are equal
})

test('value types are simply returned as it is', () => {
  expect(getRS(10)).toBe(10)
  expect(getRS(0)).toBe(0)
  expect(getRS(undefined)).toBe(undefined)
  expect(getRS(false)).toBe(false)
  expect(getRS(true)).toBe(true)
  expect(getRS(null)).toBe(null)
  expect(getRS('')).toBe('')
  expect(getRS('some string')).toBe('some string')
})


