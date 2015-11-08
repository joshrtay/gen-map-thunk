/**
 * Imports
 */

import toPromise from 'to-promise'

/**
 * Map
 * @param  {Function} p Calls p once for each item produced by `it`. P can be a thunk.
 * @param  {Function|Generator} it Produces items.
 * @param  {Any} ...args Arguments for it.
 * @return {Promise}
 */

function map (p, it, ...args) {
  return new Promise(function (resolve, reject) {
    if (isFunction(it)) {
      it = it(...args)
    }
    if (!it || !isFunction(it.next)) return resolve(it)

    var onFulfilled = iter('next')
    var onRejected = iter('throw')

    onFulfilled()

    function next (ret) {
      if (ret.done) return resolve(ret.value)
      toPromise(p(ret.value)).then(onFulfilled, onRejected)
    }

    function iter (attr) {
      return function (res) {
        var ret
        try {
          ret = it[attr](res)
        } catch (e) {
          return reject(e)
        }
        next(ret)
      }
    }
  })
}

/**
 * Check if value is function
 * @param  {Any}  v
 * @return {Boolean}
 */
function isFunction (v) {
  return 'function' === typeof v
}

/**
 * Exports
 */

export default map
