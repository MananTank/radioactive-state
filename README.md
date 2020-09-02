<!-- logo -->
<p align="center">
  <img width='300' src="img/logo-and-text.svg">
</p>

<!-- tag line -->
<h3 align='center'> Make Your React App Truly Reactive ! </h3>

<!-- primary badges -------------------------------------->
<p align="center">
  <!-- version -->
  <img src='https://img.shields.io/github/package-json/v/MananTank/radioactive-state?color=blue&label=npm&style=flat' />
  <!-- size -->
  <img src='https://img.shields.io/bundlephobia/minzip/radioactive-state?color=success&label=size' />
  <!-- downloads npm per week  -->
  <img src='https://img.shields.io/npm/dw/radioactive-state?color=blueviolet' />

  <!-- chat -->
<a href='https://join.slack.com/t/radioactive-state/shared_invite/zt-gwd1rsvr-vkoizw5RG5rk9rwsdgT3gQ'>
<img src='https://img.shields.io/badge/Chat-Slack-red'>
</a>

  <!-- stars -->
  <img src='https://img.shields.io/github/stars/MananTank/radioactive-state?style=social&color=%23FFB31A' />
  <!-- follow -->
  <img src='https://img.shields.io/github/followers/MananTank?label=Follow&style=social&color=%23FFB31A' />



  <!-- Twitter intent -->
  <a href='https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2FMananTank%2Fradioactive-state&via=MananTank_&text=Make%20your%20@react%20App%20Truly%20Reactive%20with%20radioactive-state&hashtags=react%2CradioactiveState' target='_blank'>
    <img src='https://img.shields.io/twitter/url/http/shields.io.svg?style=social'/>
  </a>
</p>

<!-- Coverage badges ---------------------------------- -->
<p align='center'>
  <img src='https://img.shields.io/badge/Stmts-100%25-success' />
  <img src='https://img.shields.io/badge/Branch-100%25-success' />
  <img src='https://img.shields.io/badge/Funcs-100%25-success' />
  <img src='https://img.shields.io/badge/Lines-100%25-success' />
</p>

<br/>




## Features

☢ Deeply Reactive, Directly Mutate State at any level to Update Component

⚡ Blazing Fast - 25% faster than `useState`

📺 No Extra Re-Renders - Auto Mutation batching

🌿 Always Fresh State, _unlike_ `useState`

🧬 Reactive Bindings For Inputs

⚛ Reactive Props !

☕ Zero Dependencies, Ultra Light-Weight `830 b`

<br/>




## 🌻 Motivation

While the React's `useState` hook has been great for simple states, it is still **a pain to update a complex state**.

It also comes with other problems like **not having the access to fresh state right away** after the state is set and closure problems because of `useState`'s state only updating the state's value after a re-render. This can create frustrating bugs.

We can eliminate these problems, improve performance and introduce exciting new features in React with a **Truly Reactive State !**

Enter `radioactive-state`

<br/>


## Installation

```bash
npm i radioactive-state
```

<br/>


## ☢️ What's a Radioactive-State ?

Radioactive state is a **deeply reactive** state.
When it is mutated at any level ( shallow or deep ) it re-renders the component automatically !

No need to set the state. No need to use libraries like immer.js to produce a new State. No overhead of creating a new state at all! **Just mutate your state, that's it !**

<br/>





## ✨ useRS hook

`radioactive-state` gives you a hook - `useRS` ( use radioactive state ) which lets you create a radioactive state in your React Components.
Let's see a few simple examples :

<details>

  <summary>
    🍭 <strong>Counter App</strong>
    <p align='center'>
      <img align='center' src='img/counter.gif' width='450'/>
    </p>
  </summary>

  <a href='https://codesandbox.io/s/counter-example-v9bsh?file=/src/Counter.js' target="_blank" title='counter app'> Live Demo </a>

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
</details>

---



<details>
  <summary>
    <strong> 🍡 Array Of Counters App </strong>
    <p align='center'>
      <img align='center' src='img/counters.gif' width='450'/>
    </p>
  </summary>

  Let's take this a step further, Let's make an app that has an array of counters, each of them can be incremented individually and all of their sum is displayed too

  This examples shows that deep mutation also triggers a re-render and that **you can use any mutative functions directly**, you don't have to create new state.

  <a href='https://codesandbox.io/s/counters-example-sctz6?file=/src/Counters.js' target="_blank" title='counter app'> Live Demo </a>

  ```jsx
  import useRS from "radioactive-state";


  const Counters = () => {

    const state = useRS({
      counts: [0],
      sum: 0
    });

    const increment = (i) => {
      state.counts[i]++;
      state.sum++;
    };

    const addCounter = () => state.counts.push(0);

    return (
      <>
        <button onClick={addCounter}> Add Counter </button>
        <div className="counts">
          {state.counts.map((count, i) => (
            <div className="count" onClick={() => increment(i)} key={i}>
              {count}
            </div>
          ))}
        </div>
        <div className="count sum">{state.sum}</div>
      </>
    );
  };
  ```
</details>
<br />





## 📺 No Extra Re-Renders, Mutations are Batched

You might be wondering:

> "What if I mutate multiple things in state, Is that gonna re-render component multiple times ?"

**Nope!** 😉

### Example:

```js
// suppose you are mutating multiple things in your state in a function doStuff

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

// When this function is called
// it is not **not** going to trigger re-render of component 8 times 😉
// it will only trigger re-render 1 time! - No extra re-renders! 🤗
```

#### 🤨 How is that possible ?

When you start mutating your state, radioactive-state schedules an async re-render to run after all the sync code is executed.
So, No matter how many times you mutate the state, it only triggers re-render once 😙

<br/>




<!-- --------------------------------------------------------------------- -->
## ⚛ Reactive Props

In traditional React, Props are considered immutable and mutating them does nothing. But When using radioactive-state, if you pass a piece of state as a prop to child component, this **child component has the capability to trigger a re-render in parent component** by mutating the prop !

This can be a **powerful feature**, where **you no longer have to pass functions as props to child component for triggering a re-render in parent component**, which also removes the need to memoize that function


### Example: Todos App

<a href='https://codesandbox.io/s/todos-example-zivos?file=/src/AddTodo.js' target='_black'> Live Demo </a>

<p align='center'> <img align='center' src='img/todos.gif' width='350'/> </p>

---


<!-- --------------------------------------------------------------------- -->



## 🌿 State is always fresh !

unlike `useState`, `useRS`'s state is always fresh

#### What does that mean ?

when you set a new state using `useState`'s setter function, it does not directly change the value of state. value of state is changed only after a re-render. This can cause some weird bugs.

Let's see those problems and see how `radioactive-state` is immune to them.


<details>
  <summary> <code>useState</code>'s state is not always fresh </summary>
  <br/>

  Let's add Logs before and after the state is set in our counter app.

  <a href='https://codesandbox.io/s/usestate-s-state-is-not-always-fresh-pfzpw?file=/src/App.js' target='_black'> Live Demo </a>

  ```js
  const [count, setCount] = useState(0)

  const increment = () => {
    console.log('before: ', count)
    setCount(count + 1)
    console.log('after: ', count)
  }

  // when increment is called, you would get this logs:
  // before: 0
  // after: 0

  // same thing happens no matter what data type you are using - reference type or value type
  ```

  <br/>


  ### `useRS` solves it !

  `useRS`'s state is mutated directly by the user. So, **No need to wait for a re-render to get the fresh state**.

  <a href='https://codesandbox.io/s/usestate-s-state-is-not-always-fresh-pfzpw?file=/src/App.js' target='_black'> Live Demo </a>


  ```js
  const state = useRS({
      count: 0
    })

  const increment = () => {
    console.log('before: ', state.count)
    state.count++
    console.log('after: ', state.count)
  }

  // works as expected 😄
  // before: 0
  // after: 1
  ```

  With radioactive-state, You can use your state with confidence that whenever you use it, it's gonna be fresh ! 😙

  ---

</details>



<!-- --------------------------------------------------------------------- -->
<details>
  <summary> <code>useState</code>'s closure problem </summary>

  <br/>

  Let's assume that increment function is async and before incrementing the value of count, we have to wait for some async task.

  Now guess what happens if you click the counter quickly 3 times?
  count is only going to increment to 1 instead of 3, even though increment function is called 3 times !

  <a href='https://codesandbox.io/s/usestates-closure-problem-x6g28?file=/src/App.js' target='_black'> Live Demo </a>

  ```js
  const [count, setCount] = useState(0)

  const increment = async () => {
    await someAsyncTask(); // assume that this takes about 500ms
    setCount(count + 1) // does not work properly
  }

  ```


  This happens because setCount keeps using old value of count until the component re-renders.
  This is because increment function "closes over" the count when it was defined

  ```js
  // to fix this you have would have to set the state like this
  // this creates confusion about what happens when
  setCount(previousCount => previousCount + 1)
  ```

  This gets really complex when you want to update other states based newValue of one state.
  We would have to nest setters one inside another 🤮

  <br/>

  ### `useRS` does not have this problem !

  <a href='https://codesandbox.io/s/users-solves-the-closure-problem-2iys5?file=/src/App.js' target='_black'> Live Demo </a>

  If you click the button 3 times quickly, count will only increment from 0 to 3 after 500ms. It works as expected 🙌

  ```js
  const state = useRS({
    count: 0
  })

  const increment = async () => {
    await someAsyncTask(); // assume that this takes about 500ms
    state.count++ // works ! 😙
  }

  ```
  ---

</details>
<br/>




<!-- --------------------------------------------------------------------- -->
## ⚡ Radioactive State is blazing fast !

`radioactive-state` is **25% faster** than `useState` for a fairly Complex State.

> This number is derived from an average of 100 performance tests where an array of 200 objects is rendered and various operations like adding, removing, re-ordering and mutations where done one after another.

Note that, radioactive-state **keeps getting faster and faster** compared to useState if you keep increasing the complexity of state, **even more than 25%**

But, **for an average web app**, both will have about the **same performance** where state of a component is not that complex

### Why is it faster than `useState` ?

In the case of `useState`, every time you want to update the state, you have to create a new state and call setter function with the newState.

But, in case of `radioactive-state` **you don't have to create a new state**, you just mutate the state and that's it. radioactive-state **does not create a newState** under the hood either. There are other optimizations as well, which makes sure no extra work is done, no extra re-renders are triggered.

<br/>



<!-- --------------------------------------------------------------------- -->
## 🧬 Reactive bindings for inputs

<details>
  <summary> You can create a controlled input the old way like this </summary>

  ### using the `useState`
  ```jsx
    const [input, setInput] = useState("type something");

    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      type='text'
    />
    ```

    ### using the useRS

    ```jsx
    // creating state
    const state = useRS({
      input: ''
    })

    <input
      value={state.input}
      onChange={(e) => state.input = e.target.value}
      type='text'
    />
  ```

  Both are fairly easy but becomes annoying if you have a form with multiple inputs

  You would also have to convert string to number if the input is type 'number' or 'range'.
  You would also need to use 'checked' prop instead of 'value' for checkboxes and radios

  ---

</details>

<!-- --------------------------------------------------------------------- -->
radioactive-state provides a binding API that lets you bind an input's value to a key in state.

To bind `state.key` to an input you prefix the key with $ - `state.$key` and then spread over the input. that's it ! 😮

```js
<input {...state.$key}  />
```


This works because, `state.key` returns the value but `state.$key` returns an object containing value and onChange props, which we are spreading over input

### Bindings takes care of different types of inputs

Bindings **rely on initial value of the key** in state to figure out what type of input it is

if the initial value is a type of `string` or `number`, `state.$key` return `value` and `onChange`.
If the initial value is of type `boolean`, `state.$key` returns `checked` and `onChange` props and uses `e.target.checked` internally

If the initial value is `number` type, onChange function converts the `e.target.value` from `string` to `number` then saves it

#### Example


<p align='center'>
<img src='./img/form.gif' width='300'>
</p>

<a href='https://codesandbox.io/s/reactive-bindings-all-types-dleod?file=/src/App.js' target="_blank" title='counter app'> Live Demo </a>


```jsx
const state = useRS({
  a: 69,
  b: 420,
  c: "Hello",
  d: "Write something here",
  e: true,
  f: "bar"
});

const { $a, $b, $c, $d, $e, $f } = state;

return (
  <div className="App">
    <pre> {JSON.stringify(state, null, 2)}</pre>
    <input {...$a} type="number" />
    <input {...$b} type="range" min="0" max="1000" />
    <input {...$c} type="text" />
    <textarea {...$d} />
    <input {...$e} type="checkbox" />
    <select {...$f}>
      <option value="foo"> foo </option>
      <option value="bar"> bar </option>
      <option value="baz"> baz </option>
    </select>
  </div>
);

```
<br/>


## ❓ FAQs


<!-- faq 1 -->
<details>
  <summary>Can I use useRS hook more than once ? </summary>

  <br/>

  **Yes.** You don't have to put all of the state of the component inside the state object. You can use the hook more than once.

   **Example**

  ```javascript
  const todos = useRS([])
  const form = useRS({
    name: '',
    age: 0,
  })
  ```

  While this is okay, **I would advise you to not do this**, Because putting all of state in one object gives you better **performance** in the case of radioactive-state.

  It would also be **hard to store simple value types**, because simple value types can not be mutated and so you would need to wrap it inside an object.

  Example:

  ```javascript
  const count = useRS(0) // invalid, gives error ❌

  // do this instead
  const count = useRS( { value: 0 }) // works ✅
  ```

  This would also make creating reactive bindings awkward. That's why it is **strongly recommended to store all the state into a single object** by using useRS only once !

  ---
</details>


<!-- faq 2 -->
<details>
<summary> Is this magic, How does it work ? </summary>

<br/>

The library uses **JavaScript Proxy** to create a deeply reactive object by recursively proxifying the object. Whenever a mutation occurs in the state tree, a function is called with information about where the mutation took place which schedules an async re-render to update the component to reflect the changes in state to UI.

</details>

<!-- faq 3 -->
<details>
<summary> Should I ditch the <code>useState</code> and use <code> useRS</code> instead ? </summary>

<br/>

Well, Sure. If your team is on-board with it, Go ahead !

</details>



<br/>

## 💙 Contributing

PR's are welcome !

Found a Bug ? Create an Issue.

Chat on [Slack](https://join.slack.com/t/radioactive-state/shared_invite/zt-gwd1rsvr-vkoizw5RG5rk9rwsdgT3gQ)

<br/>


## 💖 Like this project ?

Leave a ⭐ If you think this project is cool.

[Share with the world](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2FMananTank%2Fradioactive-state&via=MananTank_&text=Make%20your%20@react%20App%20Truly%20Reactive%20with%20radioactive-state&hashtags=react%2CradioactiveState) ✨

Let me know on [Twitter](https://twitter.com/MananTank_)


<br/>

## 👨‍💻 Author

### Manan Tank

[Twitter](https://twitter.com/MananTank_ "Manan Tank")

<br/>

## 🍁 Licence

**ISC**




<!-- --------------------------------------------------------------------- -->
<!-- ## FAQs




#### Should I ditch useState and just use useRS ? -->