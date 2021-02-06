// schedule the callback (cb) to be run asynchronously only once
const afterSync = (cb) => {
  if (!cb.scheduled) {
    cb.scheduled = true
    setTimeout(() => {
      cb()
      cb.scheduled = false
    }, 0)
  }
}

module.exports = afterSync