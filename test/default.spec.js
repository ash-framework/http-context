/* global describe, it */
const assert = require('assert')
const HttpContext = require('../src')

function makeMockRequestObject () {
  return {constructor: {name: 'IncomingMessage'}}
}

function makeMockResponseObject () {
  return {constructor: {name: 'ServerResponse'}}
}

describe('HttpContext', function () {
  it('creating with request and response', function () {
    const request = makeMockRequestObject()
    const response = makeMockResponseObject()

    const context = new HttpContext(request, response)

    assert.strictEqual(context.request.constructor.name, 'IncomingMessage')
    assert.strictEqual(context.response.constructor.name, 'ServerResponse')
  })

  it('context get and set', function () {
    const request = makeMockRequestObject()
    const response = makeMockResponseObject()

    const context = new HttpContext(request, response)
    context.set('prop', 2)

    assert.strictEqual(context.get('prop'), 2)
  })

  it('context set preserved across HttpContext instances', function () {
    const request = makeMockRequestObject()
    const response = makeMockResponseObject()

    const context = new HttpContext(request, response)
    context.set('prop', 2)

    const context2 = new HttpContext(request, response)

    assert.strictEqual(context2.get('prop'), 2)
  })

  it('constructor arguments 1', function () {
    assert.throws(() => new HttpContext({}, {}))
  })

  it('constructor arguments 2', function () {
    const request = makeMockRequestObject()
    assert.throws(() => new HttpContext(request, {}))
  })

  it('constructor arguments 3', function () {
    const response = makeMockResponseObject()
    assert.throws(() => new HttpContext({}, response))
  })

  it('get arguments', function () {
    const request = makeMockRequestObject()
    const response = makeMockResponseObject()
    const context = new HttpContext(request, response)

    assert.throws(() => context.get('asd', 'asd'))
  })

  it('set arguments', function () {
    const request = makeMockRequestObject()
    const response = makeMockResponseObject()
    const context = new HttpContext(request, response)

    assert.throws(() => context.set('asd'))
  })
})
