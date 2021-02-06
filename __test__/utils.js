const wait = (ms) => new Promise( (res) => setTimeout( res, ms))

module.exports = {wait}