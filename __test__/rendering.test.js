import getRadioactive from '../utils/getRadioactive'

test('multiple mutations call onChange multiple times', () => {
	const mockFn = jest.fn(() => {})
	const state = getRadioactive({ count: 0, count2: 10 }, mockFn)
	state.count++
	state.count2++
	expect(mockFn.mock.calls.length).toBe(2)
})
