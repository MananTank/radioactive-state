const unwrap = (x) => typeof x === 'function' ? x() : x
module.exports = unwrap