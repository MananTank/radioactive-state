// run the given function after all the sync code is completed
// timer is a variable which keeps track of whether the setTimeout is set or not
// this is useful if you want the fn to be called only once,
// for that you can check the value of timer.set
// only call afterSync if timer.set is false

const afterSync = (fn, timer) => {
  timer.set = true
  setTimeout(() => {
    fn()
    timer.set = false
  }, 0)
}

export default afterSync