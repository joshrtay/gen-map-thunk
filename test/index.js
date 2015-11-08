/**
 * Imports
 */

import test from 'tape'
import map from '../src'

/**
 * Tests
 */

test('should perform basic map', (t) => {
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

test('should map thunk', (t) => {
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

test('should map initial ags', (t) => {
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

test('should resolve value', (t) => {
  map(function () {}, 1).then(function (res) {
    t.equal(res, 1)
    t.end()
  })
})

test('should not map top level return value', (t) => {
  var l = []
  function log (v) {
    l.push(v)
  }
  map(log, function *() {
    yield 1
    yield 2
    return 3
  }).then(function (val) {
    t.equal(val, 3)
    t.deepEqual(l, [1, 2])
    t.end()
  })
})

test('should reject thrown errors in map', (t) => {
  map(function (val) {
    throw val
  }, function * () {
    try {
      yield 1
    } catch (e) {
      return 1
    }
  }).catch(function (err) {
    t.equal(err, 1)
    t.end()
  })
})

test('should reject thrown erros in generator', (t) => {
  map(function () {}, function * () {
    throw new Error('foo')
  }).catch(function (err) {
    t.ok(err)
    t.end()
  })
})

test('should be able to catch rejected promise returned by map', (t) => {
  map(function (val) {
    return Promise.reject(val)
  }, function * () {
    try {
      yield 1
    } catch (e) {
      return 1
    }
  }).then(function (res) {
    t.equal(res, 1)
    t.end()
  })
})
