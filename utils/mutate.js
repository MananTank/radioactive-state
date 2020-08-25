
/*
* Mutate the given state using the chain value and trap
* For example:
* to do state.a.b.c.d[2] = 100
* call the funcion like this :
* mutate(state, ['a', 'b', 'c', 'd', '2'], 100, 'set')
*/

// use all keys expect last one in chain to get the target object
// last key in chain, becomes the prop
// mutate using the Reflect API

export const mutate = (state, chain, value, trap) => {
  let target = state
  chain.slice(0, -1).forEach(key => target = target[key])
  const prop = chain[chain.length - 1]
  return Reflect[trap](target, prop, value)
}


export default mutate


// silent mutate mutates the radioactive state in a way that does not trigger onChange
export const silentMutate = (state, ...args) => {
  state.__disableOnChange__ = true
  const success = mutate(state, ...args )
  state.__disableOnChange__ = false
  return success
}
