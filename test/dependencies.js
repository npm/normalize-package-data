const test = require('node:test')
const assert = require('node:assert')
const normalize = require('../lib/normalize')

const warningMessages = require('../lib/warning_messages.json')
const safeFormat = require('../lib/safe_format')

test('warn if dependency contains anything else but a string', function () {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  normalize({
    dependencies: { a: 123 },
    devDependencies: { b: 456 },
    optionalDependencies: { c: 789 },
  }, warn)

  var wanted1 = safeFormat(warningMessages.nonStringDependency, 'a', 123)
  var wanted2 = safeFormat(warningMessages.nonStringDependency, 'b', 456)
  var wanted3 = safeFormat(warningMessages.nonStringDependency, 'c', 789)
  assert.ok(warnings.includes(wanted1), wanted1)
  assert.ok(warnings.includes(wanted2), wanted2)
  assert.ok(warnings.includes(wanted3), wanted3)
})

test('warn if bundleDependencies array contains anything else but strings', function () {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  normalize({
    bundleDependencies: ['abc', 123, { foo: 'bar' }],
  }, warn)
  var pkg = {
    dependencies: {
      def: '^1.0.0',
    },
    bundleDependencies: ['abc', 'def', 123, { foo: 'bar' }],
  }
  normalize(pkg, warn)

  var wanted1 = safeFormat(warningMessages.nonStringBundleDependency, 123)
  var wanted2 = safeFormat(warningMessages.nonStringBundleDependency, { foo: 'bar' })
  var wanted3 = safeFormat(warningMessages.nonDependencyBundleDependency, 'abc')
  assert.ok(warnings.includes(wanted1), wanted1)
  assert.ok(warnings.includes(wanted2), wanted2)
  assert.ok(warnings.includes(wanted3), wanted3)
  assert.strictEqual(pkg.dependencies.abc, '*', 'added bundled dep to dependencies with *')
  assert.strictEqual(pkg.dependencies.def, '^1.0.0', 'left def dependency alone')
})

test('warn if bundleDependencies is not an array', function () {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  var data = {
    name: 'test-package',
    version: '1.0.0',
    bundleDependencies: 'not-an-array',
  }
  normalize(data, warn)
  assert.strictEqual(data.bundleDependencies, undefined, 'non-array bundleDependencies should be removed')
  assert.ok(
    warnings.some(w => w.includes("Invalid 'bundleDependencies' list")),
    'should warn about non-array bundleDependencies'
  )
})

test('warn if bundleDependencies is an object', function () {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  var data = {
    name: 'test-package',
    version: '1.0.0',
    bundleDependencies: { foo: 'bar' },
  }
  normalize(data, warn)
  assert.strictEqual(data.bundleDependencies, undefined, 'object bundleDependencies should be removed')
  assert.ok(
    warnings.some(w => w.includes("Invalid 'bundleDependencies' list")),
    'should warn about non-array bundleDependencies'
  )
})

test('warn if dependencies is not an object', function () {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  var data = {
    name: 'test-package',
    version: '1.0.0',
    dependencies: null,
    devDependencies: 123,
  }
  normalize(data, warn)
  assert.strictEqual(data.dependencies, undefined, 'null dependencies should be removed')
  assert.strictEqual(data.devDependencies, undefined, 'number devDependencies should be removed')
  assert.ok(
    warnings.some(w => w.includes('dependencies') && w.includes('field must be an object')),
    'should warn about non-object dependencies'
  )
  assert.ok(
    warnings.some(w => w.includes('devDependencies') && w.includes('field must be an object')),
    'should warn about non-object devDependencies'
  )
})

test('safeFormat throws TypeError on falsy argument', function () {
  assert.throws(
    () => safeFormat(null),
    { name: 'TypeError', message: 'Bad arguments.' }
  )
  assert.throws(
    () => safeFormat(undefined),
    { name: 'TypeError', message: 'Bad arguments.' }
  )
  assert.throws(
    () => safeFormat(''),
    { name: 'TypeError', message: 'Bad arguments.' }
  )
  assert.throws(
    () => safeFormat(0),
    { name: 'TypeError', message: 'Bad arguments.' }
  )
  assert.throws(
    () => safeFormat(false),
    { name: 'TypeError', message: 'Bad arguments.' }
  )
  assert.throws(
    () => safeFormat('valid', null),
    { name: 'TypeError', message: 'Bad arguments.' }
  )
})
