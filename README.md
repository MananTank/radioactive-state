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

🌿 **Always Fresh State**, *unlike* `useState`

🧬 **Reactive Bindings** For Inputs

🔁 Free **Two-Way Binding**

📺 No Extra Re-Renders - **Auto Mutation batching**

☕ **Zero Dependencies**, Ultra Light-Weight  `830 b`

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
import useRS from "radioactive-state";

const Counter = () => {

  // create a radioactive state
  const state = useRS({
    count: 0
  });

  // yep, that's it
  const increment = () => state.count++;

  return (
    <div onClick={increment} >
      {state.count}
    </div>
  );
};

```

<a href='https://codesandbox.io/s/counter-example-v9bsh?file=/src/Counter.js' target="_blank" title='counter app'>Open in CodeSandbox</a>

