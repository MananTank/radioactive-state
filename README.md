<p align="center">
  <img width="150" src="img/radioactive-state.svg">
</p>

<h1 align='center'> radioactive-state </h1>
<h3 align='center'> Make Your React App Truly Reactive ! </h3>

<!-- badges -->
<p align="center">

<!-- version -->
<img src='https://img.shields.io/github/package-json/v/MananTank/radioactive-state?color=%23FFB31A&label=npm&style=flat' />

<!-- size -->
<img src='https://img.shields.io/bundlephobia/minzip/radioactive-state?color=%23FFB31A&label=size' />

<!-- downloads npm per week  -->
<img src='https://img.shields.io/npm/dw/radioactive-state?color=%23FFB31A' />

<!-- language  -->
<img src='https://img.shields.io/github/languages/top/MananTank/radioactive-state?color=%23FFB31A&style=flat' />

<!-- stars -->
<img src='https://img.shields.io/github/stars/MananTank/radioactive-state?style=flat&color=%23FFB31A' />

<!-- follow -->
<img src='https://img.shields.io/github/followers/MananTank?label=Follow&style=flat&color=%23FFB31A' />

</p>

<br/>
<!-- badges -->

## Features

☢ **Deeply Reactive**, Directly Mutate State at any level to Update Component

🏎️ **Blazing Fast** - 25% faster than `useState`

🌿 **Always Fresh State**, _unlike_ `useState`

🧬 **Reactive Bindings** For Inputs

🔁 Free **Two-Way Binding**

📺 No Extra Re-Renders - **Auto Mutation batching**

☕ **Zero Dependencies**, Ultra Light-Weight `830 b`

<br />

## 🤔 Motivation

While the React's `useState` hook has been great for simple states, it is still **a pain to update a complex state**.

It also comes with other problems like **not having the access to fresh state right away** after the state is set and async event handlers using the old value of state because of closure. These problems occur because `useState`'s state only updates after a re-render. This can create frustrating bugs.

We can eliminate all these problems and even introduce exciting new features in React with a **Truly Reactive State !**

Enter `radioactive-state`

<br/>

## 🧐 What's a Radioactive-State ?

> Radioactive state is a **deeply reactive** state.
> When it is mutated at any level ( shallow or deep ) it re-renders the component automatically !

No need to set the state. No need to use libraries like immer.js to produce a new State. No overhead of creating a new state at all!

**Just mutate your state, that's it !**

<br/>

## Creating a radioactive-state with useRS hook

`radioactive-state` gives you a hook to create a radioactive-state in your component. Let's see it in action

### Counter Example

Let's create the easiest thing ever - A Counter app

<p align='center'>
<img align='center' src='img/counter.gif' width='450'/>
</p>

```jsx
import useRS from 'radioactive-state';

const Counter = () => {
	// create a radioactive state
	const state = useRS({
		count: 0,
	});

	// yep, that's it
	const increment = () => state.count++;

	return <div onClick={increment}>{state.count}</div>;
};
```

<a href='https://codesandbox.io/s/counter-example-v9bsh?file=/src/Counter.js' target="_blank" title='counter app'>Open in CodeSandbox</a>

<br />

## Counters Example

Let's take this a step further, Let's make an app that has an array of counters, each of them can be incremented individually and all of their sum is displayed too

<p align='center'>
  <img align='center' src='img/counters.gif' width='650'/>
</p>

```jsx
import useRS from 'radioactive-state';

const Counters = () => {
	const state = useRS({
		counts: [0],
	});

	// deep mutation also triggers re-render !
	const increment = i => state.counts[i]++;
	const addCounter = () => state.counts.push(0);

	return (
		<>
			<button onClick={addCounter}> Add Counter </button>

			<div className='counts'>
				{state.counts.map((count, i) => (
					<div className='count' onClick={() => increment(i)} key={i}>
						{count}
					</div>
				))}
			</div>

			<div className='count total'>{state.counts.reduce((x, sum) => sum + x, 0)}</div>
		</>
	);
};

export default Counters;
```

<a href='https://codesandbox.io/s/counters-example-sctz6?file=/src/Counters.js' target="_blank" title='counter app'>Open in CodeSandbox</a>

<br />

## 📺 No Extra Re-Renders, Mutations are Batched

You might be wondering:

> "What if I mutate multiple things in state, Is that gonna re-render component multiple times ?"

**Nope!** 😉

#### Let me give you an example:

```js
// suppose you are mutating multiple things in your state in a function "doStuff"

const doStuff = () => {
	state.a = 200;
	state.b.x.y.push([10, 20, 30]);
	state.c++;
	state.c++;
	state.c++;
	delete state.d.e.f;
	state.e.splice(10, 1);
	state.f = state.f.filter(x => x.completed);
};

// let's say this function is called,

// don't worry, this is **not** going to re-render component 8 times 😉
// it will only re-render the component only 1 time! - No extra re-renders! 🤗
```

#### How is that possible ?

When you make the first mutation, radioactive-state schedules an async re-render. Meaning that after all the sync code (doStuff's code) executes, only then component re-renders, and only once !
