var tap = require('tap')
var fs = require('fs')
var path = require('path')

var normalize = require('../lib/normalize')
var warningMessages = require('../lib/warning_messages.json')
var safeFormat = require('../lib/safe_format')

var rpjPath = path.resolve(__dirname, './fixtures/read-package-json.json')

tap.test('normalize some package data', function (t) {
  var packageData = require(rpjPath)
  var warnings = []
  normalize(packageData, function (warning) {
    warnings.push(warning)
  })
  // there's no readme data in this particular object
  t.equal(warnings.length, 1, "There's exactly one warning.")
  fs.readFile(rpjPath, function (err, data) {
    if (err) {
      throw err
    }
    // Various changes have been made
    t.not(packageData, JSON.parse(data), 'Output is different from input.')
    t.end()
  })
})

tap.test('runs without passing warning function', function (t) {
  fs.readFile(rpjPath, function (err, data) {
    if (err) {
      throw err
    }
    normalize(JSON.parse(data))
    t.ok(true, "If you read this, this means I'm still alive.")
    t.end()
  })
})

tap.test('empty object', function (t) {
  var packageData = {}
  var expect =
    { name: '',
      version: '',
      readme: 'ERROR: No README data found!',
      _id: '@' }

  var warnings = []
  function warn (m) {
    warnings.push(m)
  }
  normalize(packageData, warn)
  t.same(packageData, expect)
  t.same(warnings, [
    warningMessages.missingDescription,
    warningMessages.missingRepository,
    warningMessages.missingReadme,
    warningMessages.missingLicense,
  ])
  t.end()
})

tap.test('core module name', function (t) {
  var warnings = []
  function warn (m) {
    warnings.push(m)
  }
  var coreModules = ['http', '_stream_writable']
  var expect = []
  for (var i = 0; i < coreModules.length; ++i) {
    normalize({
      name: coreModules[i],
      readme: 'read yourself how about',
      homepage: 123,
      bugs: "what is this i don't even",
      repository: 'Hello.',
    }, warn)

    expect = expect.concat([
      safeFormat(warningMessages.conflictingName, coreModules[i]),
      warningMessages.nonEmailUrlBugsString,
      warningMessages.emptyNormalizedBugs,
      warningMessages.nonUrlHomepage,
      warningMessages.missingLicense,
    ])
  }
  t.same(warnings, expect)
  t.end()
})

tap.test('urls required', function (t) {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  normalize({
    bugs: {
      url: '/1',
      email: 'not an email address',
    },
  }, warn)
  normalize({
    readme: 'read yourself how about',
    homepage: 123,
    bugs: "what is this i don't even",
    repository: 'Hello.',
  }, warn)

  var expect =
    [warningMessages.missingDescription,
      warningMessages.missingRepository,
      warningMessages.nonUrlBugsUrlField,
      warningMessages.nonEmailBugsEmailField,
      warningMessages.emptyNormalizedBugs,
      warningMessages.missingReadme,
      warningMessages.missingLicense,
      warningMessages.nonEmailUrlBugsString,
      warningMessages.emptyNormalizedBugs,
      warningMessages.nonUrlHomepage,
      warningMessages.missingLicense]
  t.same(warnings, expect)
  t.end()
})

tap.test('homepage field must start with a protocol.', function (t) {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  var a
  normalize(a = {
    homepage: 'example.org',
  }, warn)

  var expect =
    [warningMessages.missingDescription,
      warningMessages.missingRepository,
      warningMessages.missingReadme,
      warningMessages.missingLicense]
  t.same(warnings, expect)
  t.same(a.homepage, 'http://example.org')
  t.end()
})

tap.test('license field should be a valid SPDX expression', function (t) {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  normalize({
    license: 'Apache 2',
  }, warn)

  var expect =
    [warningMessages.missingDescription,
      warningMessages.missingRepository,
      warningMessages.missingReadme,
      warningMessages.invalidLicense]
  t.same(warnings, expect)
  t.end()
})

tap.test("don't fail when license is just a space", function (t) {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  normalize({
    license: ' ',
  }, warn)

  var expect =
    [warningMessages.missingDescription,
      warningMessages.missingRepository,
      warningMessages.missingReadme,
      warningMessages.invalidLicense]
  t.same(warnings, expect)
  t.end()
})

tap.test("don't fail when license is licence", function (t) {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  normalize({
    description: 'description',
    readme: 'readme',
    repository: 'https://npmjs.org',
    licence: 'MIT',
  }, warn)

  t.same(warnings, [])
  t.end()
})

tap.test('gist bugs url', function (t) {
  var d = {
    repository: 'git@gist.github.com:1234567.git',
  }
  normalize(d)
  t.same(d.repository, { type: 'git', url: 'git+ssh://git@gist.github.com/1234567.git' })
  t.same(d.bugs, { url: 'https://gist.github.com/1234567' })
  t.end()
})

tap.test('singularize repositories', function (t) {
  var d = { repositories: ['git@gist.github.com:1234567.git'] }
  normalize(d)
  t.same(d.repository, { type: 'git', url: 'git+ssh://git@gist.github.com/1234567.git' })
  t.end()
})

tap.test('treat visionmedia/express as github repo', function (t) {
  var d = { repository: { type: 'git', url: 'visionmedia/express' } }
  normalize(d)
  t.same(d.repository, { type: 'git', url: 'git+https://github.com/visionmedia/express.git' })
  t.end()
})

tap.test('treat isaacs/node-graceful-fs as github repo', function (t) {
  var d = { repository: { type: 'git', url: 'isaacs/node-graceful-fs' } }
  normalize(d)
  t.same(d.repository, { type: 'git', url: 'git+https://github.com/isaacs/node-graceful-fs.git' })
  t.end()
})

tap.test('homepage field will set to github url if repository is a github repo', function (t) {
  var a
  normalize(a = {
    repository: { type: 'git', url: 'https://github.com/isaacs/node-graceful-fs' },
  })
  t.same(a.homepage, 'https://github.com/isaacs/node-graceful-fs#readme')
  t.end()
})

tap.test('homepage field will set to github gist url if repository is a gist', function (t) {
  var a
  normalize(a = {
    repository: { type: 'git', url: 'git@gist.github.com:1234567.git' },
  })
  t.same(a.homepage, 'https://gist.github.com/1234567')
  t.end()
})

/* eslint-disable-next-line max-len */
tap.test('homepage field will set to github gist url if repository is a shorthand reference', function (t) {
  var a
  normalize(a = {
    repository: { type: 'git', url: 'sindresorhus/chalk' },
  })
  t.same(a.homepage, 'https://github.com/sindresorhus/chalk#readme')
  t.end()
})

tap.test("don't mangle github shortcuts in dependencies", function (t) {
  var d = { dependencies: { 'node-graceful-fs': 'isaacs/node-graceful-fs' } }
  normalize(d)
  t.same(d.dependencies, { 'node-graceful-fs': 'github:isaacs/node-graceful-fs' })
  t.end()
})

tap.test('deprecation warning for array in dependencies fields', function (t) {
  var warnings = []
  function warn (w) {
    warnings.push(w)
  }
  normalize({
    dependencies: [],
    devDependencies: [],
    optionalDependencies: [],
  }, warn)
  t.ok(
    ~warnings.indexOf(safeFormat(warningMessages.deprecatedArrayDependencies, 'dependencies')),
    'deprecation warning'
  )
  t.ok(
    ~warnings.indexOf(safeFormat(warningMessages.deprecatedArrayDependencies, 'devDependencies')),
    'deprecation warning'
  )
  t.ok(
    ~warnings.indexOf(
      safeFormat(warningMessages.deprecatedArrayDependencies, 'optionalDependencies')
    ),
    'deprecation warning'
  )
  t.end()
})
