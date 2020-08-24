const mutate = (trap, state, chain, value) => {
	let target = state
	// do not use the last value of chain, last one becomes prop
	for (let i = 0; i < chain.length - 1; i += 1) {
		target = target[chain[i]] // setting
	}

	const prop = chain[chain.length - 1]
	// console.log('mutate: ', {target, prop, value})
	Reflect[trap](target, prop, value)
	// return state
}

export default mutate
