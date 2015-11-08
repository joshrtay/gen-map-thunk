/**
 * Imports
 */

import test from 'tape'
import map from '../src'


/**
 * Tests
 */

test('basic map', (t) => {
  let l = []
  function log (v) {
    l.push(v)
    return v + 1
  }

  map(log, function * () {
    let res = yield 1
    res = yield res
    res = yield res
  }).then(function () {
    t.deepEqual(l, [1, 2, 3])
    t.end()
  })

})

test('async map', (t) => {
  let l = []
  function log (v) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        l.push(v)
        resolve(v + 1)
      })
    })
  }

  map(log, function * () {
    let res = yield 1
    res = yield res
    res = yield res
  }).then(function () {
    t.deepEqual(l, [1, 2, 3])
    t.end()
  })
})

test('map initial ags', (t) => {
  let l = []
  function log (v) {
    l.push(v)
    return v + 1
  }

  map(log, function * (init) {
    let res = yield init
    res = yield res
    res = yield res
  }, 2).then(function () {
    t.deepEqual(l, [2, 3, 4])
    t.end()
  })

})

test('resolve value', (t) => {
  map(function () {}, 1).then(function (res) {
    t.equal(res, 1)
    t.end()
  })
})
