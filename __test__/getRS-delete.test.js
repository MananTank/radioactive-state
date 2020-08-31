import getRS from '../utils/getRS'


// -----------------------------------------------
test('shallow mutations on object', () => {
  const obj = { a: 10, b: 30 }

  const onChange = (chain, value, trap) => {
    expect(chain).toEqual(['a'])
    expect(value).toEqual(undefined)
    expect(trap).toEqual('deleteProperty')
    return true
  }

  const radioactive = getRS(obj, onChange)
  delete radioactive.a

  expect(radioactive).toEqual(obj)
})


// -----------------------------------------------
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
    expect(value).toEqual(undefined)
    expect(trap).toEqual('deleteProperty')
    return true
  }

  const radioactive = getRS(obj, onChange)

  delete radioactive.a.b.c.d
  expect(radioactive).toEqual(obj) // radioactive and obj are equal
})


// -----------------------------------------------
test('shallow mutations on array', () => {
  const arr = [10, 20, 30, 40]

  const onChange = (chain, value, trap) => {
    expect(chain).toEqual(['3'])
    expect(value).toEqual(undefined)
    expect(trap).toEqual('deleteProperty')
    return true
  }

  const radioactive = getRS(arr, onChange)

  delete radioactive[3]
  expect(radioactive).toEqual(arr) // radioactive and obj are equal
})

// -----------------------------------------------
test('deep mutations on array', () => {
  const arr = [10, 20, 30, { a: { b: { c: [10, 20, 30] } } }]

  const onChange = (chain, value, trap) => {
    expect(chain).toEqual(['3', 'a', 'b', 'c', '2'])
    expect(value).toEqual(undefined)
    expect(trap).toEqual('deleteProperty')
    return true
  }

  const radioactive = getRS(arr, onChange)

  delete radioactive[3].a.b.c[2]
  expect(radioactive).toEqual(arr) // radioactive and obj are equal
})