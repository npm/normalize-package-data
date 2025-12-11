const test = require('node:test')
const assert = require('node:assert')
const normalize = require('../lib/normalize')
const path = require('path')
const fs = require('fs')

test('bad scripts', function (t, done) {
  var p = path.resolve(__dirname, './fixtures/badscripts.json')
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
  assert.strictEqual(normalized.name, original.name, 'Name stays the same.')
  // scripts is not an object, so it should be deleted
  assert.ok(!normalized.scripts)
}

test('sets gypfile to true when install script is node-gyp rebuild', function () {
  var data = {
    name: 'test-package',
    version: '1.0.0',
    scripts: {
      install: 'node-gyp rebuild',
    },
  }
  normalize(data)
  assert.strictEqual(data.gypfile, true, 'gypfile should be set to true')
})

test('does not set gypfile when install script is different', function () {
  var data = {
    name: 'test-package',
    version: '1.0.0',
    scripts: {
      install: 'some other command',
    },
  }
  normalize(data)
  assert.strictEqual(data.gypfile, undefined, 'gypfile should not be set')
})

test('does not set gypfile when preinstall script exists', function () {
  var data = {
    name: 'test-package',
    version: '1.0.0',
    scripts: {
      install: 'node-gyp rebuild',
      preinstall: 'echo preinstall',
    },
  }
  normalize(data)
  assert.strictEqual(data.gypfile, undefined, 'gypfile should not be set when preinstall exists')
})

test('removes non-string script values', function () {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  var data = {
    name: 'test-package',
    version: '1.0.0',
    scripts: {
      test: 'echo test',
      build: 123,
      start: { command: 'node server.js' },
      deploy: null,
    },
  }
  normalize(data, warn)
  assert.strictEqual(data.scripts.test, 'echo test', 'valid string script should remain')
  assert.strictEqual(data.scripts.build, undefined, 'number script should be removed')
  assert.strictEqual(data.scripts.start, undefined, 'object script should be removed')
  assert.strictEqual(data.scripts.deploy, undefined, 'null script should be removed')
  assert.ok(
    warnings.some(w => w.includes('script values must be string commands')),
    'should warn about non-string scripts'
  )
})
