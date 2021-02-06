const reactify = require('../utils/reactify')
const {wait} = require('./utils')

// forceUpdate is called asynchronously
// - so we have to wait for all the sync code to be executed and then we can test if forceUpdate was called or not

test('shallow delete', async () => {
  const arg = { a: 10, b: 30 }
  const forceUpdate = jest.fn()
  const state = reactify(arg, forceUpdate)
  delete state.a
  await wait(100)
  expect(forceUpdate).toHaveBeenCalled()
})


test('deep delete', async () => {
  const arg = {
    a: {
      b: [ 10,20, {c: { d: 'deep'}} ]
    }
  }

  const forceUpdate = jest.fn()
  const state = reactify(arg, forceUpdate)
  delete state.a.b[2].c.d
  await wait(100)
  expect(forceUpdate).toHaveBeenCalled()
})