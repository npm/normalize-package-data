const test = require('node:test')
const assert = require('node:assert')
const normalize = require('../lib/normalize')
const path = require('path')
const fs = require('fs')

test('basic test', function (t, done) {
  var p = path.resolve(__dirname, './fixtures/read-package-json.json')
  fs.readFile(p, function (err, contents) {
    if (err) {
      throw err
    }
    var originalData = JSON.parse(contents.toString())
    var data = JSON.parse(contents.toString())
    normalize(data)
    assert.ok(data)
    verifyFields(data, originalData)
    done()
  })
})

function verifyFields (normalized, original) {
  assert.strictEqual(normalized.version, original.version, 'Version field stays same')
  assert.strictEqual(normalized._id, normalized.name + '@' + normalized.version, 'It gets good id.')
  assert.strictEqual(normalized.name, original.name, 'Name stays the same.')
  assert.strictEqual(typeof normalized.author, 'object', 'author field becomes object')
  assert.deepStrictEqual(normalized.scripts, original.scripts, 'scripts field (object) stays same')
  assert.strictEqual(normalized.main, original.main)
  // optional deps are folded in.
  assert.deepStrictEqual(normalized.optionalDependencies,
    original.optionalDependencies)
  for (const key in original.optionalDependencies) {
    assert.ok(key in normalized.dependencies, 'opt depedencies are copied into dependencies')
  }
  for (const key in original.dependencies) {
    assert.ok(key in normalized.dependencies, 'regular depedencies stay in place')
  }
  assert.deepStrictEqual(normalized.devDependencies, original.devDependencies)
  assert.strictEqual(typeof normalized.bugs, 'object', 'bugs should become object')
  assert.strictEqual(normalized.bugs.url, 'https://github.com/isaacs/read-package-json/issues')
}
