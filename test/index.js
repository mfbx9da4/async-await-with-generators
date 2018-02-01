'use strict'

process.env.NODE_ENV = 'test'

const chai = require('chai')
global.expect = chai.expect
chai.use(require('sinon-chai'))
chai.use(require('chai-as-promised'))
chai.use(require('chai-fs'))

const lib = require('../lib')

describe('tests', () => {
  it('gets test', (done) => {
    let callCount = 0

    // all async funcs must have callback as last arg
    function doGet (url, callback) {
      setTimeout(() => {
        callback(`<div>${url}</div>`)
        callCount += 1
      }, 1)
    }

    function * example (await) {
      for (let i = 0; i < 5; i++) {
        const res = yield await(doGet, [`http://url.com/${i}`]);
        expect(res).to.equal(`<div>http://url.com/${i}</div>`)
      }
    }

    lib.async(example)
    lib.async(example)
    lib.async(example)
    setTimeout(() => {
      expect(callCount).to.equal(5*3)
      done()
    }, 20)
  })

  it('should get promises')
})
