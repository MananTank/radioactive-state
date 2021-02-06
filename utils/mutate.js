/*
* Mutate the given state using the chain, value, and trap
*
* For example:
* to perform state.a.b.c.d[2] = 100
*
* call the function like this :
* mutate(state, ['a', 'b', 'c', 'd', '2'], 100, 'set')
*/

const mutate = (state, chain, value, trap) => {
  // use all keys except last one in chain to get the target object which we want to mutate
  const target = chain.slice(0, -1).reduce((t, k) => t = t[k], state)
  // last key is the prop that we want to mutate on target object
  const prop = chain[chain.length - 1]
  // if the target is radioactive, mark it as mutated
  if (target.__isRadioactive__) target.__mutated__()
  // change the prop of target object, using Reflect API
  return Reflect[trap](target, prop, value)
}

// silent mutate mutates the radioactive state in a way that does not trigger onChange
const silentMutate = (state, ...args) => {
  state.__disableOnChange__(true)
  const success = mutate(state, ...args)
  state.__disableOnChange__(false)
  return success
}

module.exports = { mutate, silentMutate }
