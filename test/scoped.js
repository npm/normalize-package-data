const test = require('node:test')
const assert = require('node:assert')

const fixNameField = require('../lib/fixer.js').fixNameField
const fixBinField = require('../lib/fixer.js').fixBinField

test('a simple scoped module has a valid name', function () {
  var data = { name: '@org/package' }
  fixNameField(data, false)
  assert.strictEqual(data.name, '@org/package', 'name was unchanged')
})

test("'org@package' is not a valid name", function () {
  assert.throws(function () {
    fixNameField({ name: 'org@package' }, false)
  }, 'blows up as expected')
})

test("'org=package' is not a valid name", function () {
  assert.throws(function () {
    fixNameField({ name: 'org=package' }, false)
  }, 'blows up as expected')
})

test("'@org=sub/package' is not a valid name", function () {
  assert.throws(function () {
    fixNameField({ name: '@org=sub/package' }, false)
  }, 'blows up as expected')
})

test("'@org/' is not a valid name", function () {
  assert.throws(function () {
    fixNameField({ name: '@org/' }, false)
  }, 'blows up as expected')
})

test("'@/package' is not a valid name", function () {
  assert.throws(function () {
    fixNameField({ name: '@/package' }, false)
  }, 'blows up as expected')
})

test("'@org/sub/package' is not a valid name (too many slashes)", function () {
  assert.throws(function () {
    fixNameField({ name: '@org/sub/package' }, false)
  }, { message: /Invalid name/ }, 'blows up when scoped name has more than one slash')
})

test("name='@org/package', bin='bin.js' is bin={package:'bin.js'}", function () {
  var obj = { name: '@org/package', bin: 'bin.js' }
  fixBinField(obj)
  assert.deepStrictEqual(obj.bin, { package: 'bin.js' })
})
