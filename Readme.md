
# gen-map-thunk

[![Codeship Status for joshrtay/gen-map-thunk](https://img.shields.io/codeship/4a647950-6881-0133-16de-262bff2f2afa/master.svg)](https://codeship.com/projects/114278)  [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Map generator items on to a thunk. Great for async action creators in redux and more generally, for moving io to the edges of an application.

## Installation

    $ npm install gen-map-thunk

## Usage

```js
import map from 'gen-map-thunk'
import fetch from 'whatwg-fetch'

let state = {}

map(function (action) {
  if (action.type === 'FETCH') {
    return fetch(action.payload.url).then(function (res) {return res.json})
  } else if (action.type === 'SET') {
    state[action.payload.key] = action.payload.value
  }
}, function * () {
  try {
    let posts = yield {type: 'FETCH', payload: {url: '/posts'}}
    yield {type: 'SET', payload: {key: 'posts', value: posts}}
  } catch (e) {
    yield {type: 'SET', payload: {key: 'posts_error': value: 'FAILED_GET'}}
  }

})

```

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
