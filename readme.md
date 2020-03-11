Async await implemented with generators. This code is an experiment for showing how async await could be implemented.

Thanks to [Eli who originally](https://github.com/eligrey/async.js) had the idea for async await with generators before promises were a thing.

## Usage

```js
const lib = require('./lib')
// Some example asynchronous function
// The library assumes that all async funcs must have a callback as the last arg
function doGet (url, callback) {
  setTimeout(() => {
    callback(`<div>${url}</div>`)
  }, 1)
}

// our example function which takes await as a parameter
function * example (await) {
  for (let i = 0; i < 5; i++) {
    const res = yield await(doGet, [`http://url.com/${i}`]);
    expect(res).to.equal(`<div>http://url.com/${i}</div>`)
  }
}

// invoking our function with the library
lib.async(example)
```

## Test 

    npm test
