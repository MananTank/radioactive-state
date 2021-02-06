const reactify = require('../utils/reactify')
const {wait} = require('./utils')

test('multiple subsequent mutations calls forceUpdate only once', async () => {

  const forceUpdate = jest.fn()
  const state =  reactify({ count: 0 }, forceUpdate)

  // doing multiple mutations
  state.count++
  state.count++
  state.count++
  state.count++
  state.count++

  // forceUpdate is called after all the code runs
  await wait(100)

  // so do this after 1 second of sync code completion, so that this executes after forceUpdate is called
  expect(forceUpdate.mock.calls.length).toBe(1)

})





