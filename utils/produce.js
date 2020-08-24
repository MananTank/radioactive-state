function produce(trap, state, chain, value) {

  // if no mutations, return original state
  if (chain.length === 0) return state

  // if there are mutations but the state is not object, throw error
  if (typeof state !== 'object' || state == null)
    throw new Error(`can not set key: "${chain[0]}" on ${state}`)

  // process the first key in chain
  const key = chain[0]

  // initialize newState
  const newState = Array.isArray(state) ? [...state] : { ...state }

  // if chain has more than 1 keys, call produce again with remaining chains
  if (chain.length > 1)
    newState[key] = produce(trap, state[key], chain.slice(1), value)

  // else reflect value into newState at given key
  else Reflect[trap](newState, key, value)

  return newState
}
export default produce
