'use strict'

const ArgumentError = require('@ash-framework/argument-error')

const _request = new WeakMap()
const _response = new WeakMap()
const _context = new WeakMap()

function constructorName (instance) {
  if (instance && instance.constructor && instance.constructor.name) {
    return instance.constructor.name
  }
  return null
}

function validateConstructorArguments (request, response) {
  if (constructorName(request) !== 'IncomingMessage') {
    const type = constructorName(request) || typeof request
    const errorMessage = `expected express 'request' object but got '${type}'`
    throw new ArgumentError('HttpContext', 'request', errorMessage)
  }
  if (constructorName(response) !== 'ServerResponse') {
    const type = constructorName(response) || typeof response
    const errorMessage = `expected express 'response' object but got '${type}'`
    throw new ArgumentError('HttpContext', 'response', errorMessage)
  }
}

function validateArgumentsLength (prop, args, num) {
  if (args.length !== num) {
    const errorMessage = `expected ${num} arguments, got ${args.length}`
    throw new ArgumentError('HttpContext', prop, errorMessage)
  }
}

class HttpContext {
  constructor (request, response) {
    validateConstructorArguments(request, response)
    _request.set(this, request)
    _response.set(this, response)
    if (!_context.has(request)) _context.set(request, new Map())
  }

  get request () {
    return _request.get(this)
  }

  get response () {
    return _response.get(this)
  }

  get (key) {
    validateArgumentsLength('get', arguments, 1)
    return _context.get(this.request).get(key)
  }

  set (key, value) {
    validateArgumentsLength('set', arguments, 2)
    _context.get(this.request).set(key, value)
  }
}

module.exports = HttpContext

