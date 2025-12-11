const test = require('node:test')
const assert = require('node:assert')
const normalize = require('../lib/normalize')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

test('consistent normalization', async () => {
  const entries = [
    'read-package-json.json',
    'http-server.json',
    'movefile.json',
    'node-module_exist.json',
  ]
  const verifyConsistency = async (entryName) => {
    const warn = () => null
    const filename = path.join(__dirname, 'fixtures', entryName)
    const contents = await readFile(filename)
    const data = JSON.parse(contents.toString())
    normalize(data, warn)
    if (data.name === 'node-module_exist') {
      assert.deepStrictEqual(data.bugs.url, 'https://gist.github.com/3135914')
    }
    if (data.name === 'read-package-json') {
      assert.deepStrictEqual(data.bugs.url, 'https://github.com/isaacs/read-package-json/issues')
    }
    if (data.name === 'http-server') {
      assert.deepStrictEqual(data.bugs.url, 'https://github.com/nodejitsu/http-server/issues')
    }
    if (data.name === 'movefile') {
      assert.deepStrictEqual(data.bugs.url, 'https://github.com/yazgazan/movefile/issues')
    }
  }
  return Promise.all(entries.map(i => verifyConsistency(i)))
})

test('warns about broken git URL with double .git.git', function () {
  const warnings = []
  const warn = (w) => warnings.push(w)
  const data = {
    name: 'test-package',
    version: '1.0.0',
    repository: {
      type: 'git',
      url: 'https://github.com/user/repo.git.git',
    },
  }
  normalize(data, warn)
  assert.ok(
    warnings.some(w => w.includes('Probably broken git url')),
    'should warn about broken git URL'
  )
})
