const t = require('tap')
const normalize = require('../lib/normalize')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

t.test('consistent normalization', async t => {
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
      t.same(data.bugs.url, 'https://gist.github.com/3135914')
    }
    if (data.name === 'read-package-json') {
      t.same(data.bugs.url, 'https://github.com/isaacs/read-package-json/issues')
    }
    if (data.name === 'http-server') {
      t.same(data.bugs.url, 'https://github.com/nodejitsu/http-server/issues')
    }
    if (data.name === 'movefile') {
      t.same(data.bugs.url, 'https://github.com/yazgazan/movefile/issues')
    }
  }
  return Promise.all(entries.map(i => verifyConsistency(i)))
})
