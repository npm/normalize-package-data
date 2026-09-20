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

test('repairs schemeless hosted repository URLs', function () {
  const cases = [
    {
      url: 'github.com/hgoebl/mobile-detect.js',
      expected: 'git+https://github.com/hgoebl/mobile-detect.js.git',
    },
    {
      url: 'gitlab.com/user/repo',
      expected: 'git+https://gitlab.com/user/repo.git',
    },
    {
      url: 'bitbucket.org/user/repo',
      expected: 'git+https://bitbucket.org/user/repo.git',
    },
    {
      url: 'www.github.com/user/repo',
      expected: 'git+https://github.com/user/repo.git',
    },
    {
      url: 'github.com/user/repo.git',
      expected: 'git+https://github.com/user/repo.git',
    },
    {
      url: '//github.com/user/repo',
      expected: 'git+https://github.com/user/repo.git',
    },
  ]

  for (const { url, expected } of cases) {
    const data = {
      name: 'test-package',
      version: '1.0.0',
      repository: { type: 'git', url },
    }
    normalize(data)
    assert.deepStrictEqual(
      data.repository,
      { type: 'git', url: expected },
      'should repair ' + url
    )
  }
})

test('repairs schemeless repository string and derives bugs/homepage', function () {
  const data = {
    name: 'test-package',
    version: '1.0.0',
    repository: 'github.com/hgoebl/mobile-detect.js',
  }
  normalize(data)
  assert.deepStrictEqual(data.repository, {
    type: 'git',
    url: 'git+https://github.com/hgoebl/mobile-detect.js.git',
  })
  assert.deepStrictEqual(data.bugs, {
    url: 'https://github.com/hgoebl/mobile-detect.js/issues',
  })
  assert.strictEqual(data.homepage, 'https://github.com/hgoebl/mobile-detect.js#readme')
})

test('leaves unrecognized schemeless repository URLs unchanged', function () {
  const data = {
    name: 'test-package',
    version: '1.0.0',
    repository: { type: 'git', url: 'example.com/user/repo' },
  }
  normalize(data)
  assert.strictEqual(data.repository.url, 'example.com/user/repo')
})

test('leaves unrecognized protocol-relative repository URLs unchanged', function () {
  const data = {
    name: 'test-package',
    version: '1.0.0',
    repository: { type: 'git', url: '//example.com/user/repo' },
  }
  normalize(data)
  assert.strictEqual(data.repository.url, '//example.com/user/repo')
})

test('does not rewrite unknown schemed repository URLs', function () {
  const data = {
    name: 'test-package',
    version: '1.0.0',
    repository: { type: 'git', url: 'https://example.com/user/repo.git' },
  }
  normalize(data)
  assert.strictEqual(data.repository.url, 'https://example.com/user/repo.git')
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
