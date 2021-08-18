const t = require('tap')
const normalize = require('../lib/normalize')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)

t.test('consistent normalization', async t => {
  const entries = await readdir(path.join(__dirname, 'fixtures'))
  const verifyConsistency = async (entryName) => {
    const warn = () => null
    const filename = path.join(__dirname, 'fixtures', entryName)
    const contents = await readFile(filename)

    const data = JSON.parse(contents.toString())
    normalize(data, warn)
    const clonedData = { ...data }
    normalize(data, warn)
    t.same(clonedData, data,
      'Normalization of ' + entryName + ' is consistent.')
  }

  return Promise.all(entries.map(i => verifyConsistency(i)))
})
