Async await implemented with generators. This code is an experiment for showing how async await could be implemented.

Thanks to Eli who originally had the idea for async await before promises were a thing.

## Usage

```js
// all async funcs must have callback as last arg
function doGet (url, callback) {
  setTimeout(() => {
    callback(`<div>${url}</div>`)
  }, 1)
}

function * example (await) {
  for (let i = 0; i < 5; i++) {
    const res = yield await(doGet, [`http://url.com/${i}`]);
    expect(res).to.equal(`<div>http://url.com/${i}</div>`)
  }
}

lib.async(example)
```

## Test 

    npm test
