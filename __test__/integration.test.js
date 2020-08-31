import getRS from '../utils/getRS'
import getOnChange from '../utils/getOnChange'
import {wait} from './utils'


test('BATCHING: multiple subsequent mutations calls forceUpdate only once', async () => {

  const forceUpdate = jest.fn()

  const rs = { current: null }
  rs.current = getRS({ value: 0 }, getOnChange(rs, forceUpdate))

  // doing multiple mutations
  rs.current.value++
  rs.current.value++
  rs.current.value++
  rs.current.value++
  rs.current.value++

  // forceUpdate is called after all the code runs
  await wait(1000)

  // so do this after 1 second of sync code completion, so that this executes after forceUpdate is called
  expect(forceUpdate.mock.calls.length).toBe(1)

})



test('FRESH STATE: state is always fresh, even directly after mutating the state', () => {

  const rs = { current: null }
  rs.current = getRS({ value: 0 }, getOnChange(rs, () => {} ))

  // doing multiple mutations
  expect(rs.current.value).toBe(0)
  rs.current.value++
  expect(rs.current.value).toBe(1)
  rs.current.value++
  expect(rs.current.value).toBe(2)
  rs.current.value++
  expect(rs.current.value).toBe(3)
  rs.current.value++

})


test('INFECTION: newly added object in the radioactive state also becomes radioactive', async () => {

  const forceUpdate = jest.fn()

  const rs = { current: null }
  rs.current = getRS({ a: 0 }, getOnChange(rs, forceUpdate))

  rs.current.a = { b: 200 }
  // forceUpdate is called after all the code runs
  await wait(1000)

  rs.current.a.b = 300

  await wait(1000)
  // so do this after 1 second of sync code completion, so that this executes after forceUpdate is called
  expect(forceUpdate.mock.calls.length).toBe(2)

})