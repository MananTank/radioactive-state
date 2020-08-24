/*
* Mutate the given state using the chain value and trap
* For example:
* to do state.a.b.c.d[2] = 100
* call the funcion like this :
* mutate(state, ['a', 'b', 'c', 'd', '2'], 100, 'set')
*/

const mutate = (state, chain, value, trap) => {
  let target = state
  // use all keys expect last one in chain to get the target object
  for (let i = 0; i <= chain.length - 2; i += 1) {
    target = target[chain[i]]
  }
  // last key in chain, becomes the prop
  const prop = chain[chain.length - 1]

  if (typeof target !== 'object') throw new Error(`Can not set key "${prop}" on non-object type "${JSON.stringify(target)}" `)
  // mutate using the Reflect API
  Reflect[trap](target, prop, value)
}

export default mutate