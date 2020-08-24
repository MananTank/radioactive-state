import mutate from './mutate'
import produce from './produce'

// why batching is added in onChange?

// make the setState run after all the sync code has completed running
// this way we can batch together successive mutations in state
// and just call the setState once

// we have to batch because there are many traps that get triggered even for a single operation
// this gets worse as you perform multiple mutations as part of a single mutation
// for example x.a = {} broken to x.a.b = .. , x.a.c = ... , x.a.d = ... etc
// batching is added to batch all these mutations into one and then call setState

const getOnChange = (radioactive, state, setState) => {
  let mutations = []
  let timer

  // reactive state when mutated, this is called
  const onChange = (chain, value, trap, ignoreMode) => {
    // save all the mutations in array
    if (!ignoreMode) mutations.push([chain, value, trap])

    // mutate the reactive directly by setting up ignore mode
    // this is done so that user can see the data change in component directly

    // when ignoreMode is on, any mutations made to reactive state does not not call onChange method
    radioactive.current.__ignoreMode__ = true
    mutate(radioactive.current, chain, value, trap)
    radioactive.current.__ignoreMode__ = false

    // when the first mutation comes, make the timer
    // all the other mutations will be saved in array
    // after all the sync code is done, code inside the setTimeout runs
    // which handles all the 'batched' mutations at once
    if (!timer) {
      timer = setTimeout(() => {
        // for the first mutation of array, create newState using produce
        const [chain, value, trap] = mutations[0]
        const newState = produce(trap, state, chain, value)

        // for rest of mutations, directly mutate newState, this is essentailly batching mutations together
        for (let i = 1; i < mutations.length; i++) {
          const [chain, value, trap] = mutations[i]
          mutate(newState, chain, value, trap)
        }

        // invalidate radioactive, since we need to make new radioactive from new state
        radioactive.current = undefined

        // mutations.length mutations are batched into one
        setState(newState)
        timer = null
        mutations = []
      }, 0)
    }
  }

  return onChange
}

export default getOnChange