// call fn() after all the sync code is completed
// call afterSync() if timer.set === false to ensure that fn is only called once

const afterSync = (fn, timer) => {
  timer.set = true
  setTimeout(() => {
    fn()
    timer.set = false
  }, 0)
}

module.exports = afterSync