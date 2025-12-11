const test = require('node:test')
const assert = require('node:assert')

const normalize = require('../')
const fixer = normalize.fixer

test('mixedcase', function () {
  assert.doesNotThrow(function () {
    fixer.fixNameField({ name: 'foo' }, true)
  })

  assert.doesNotThrow(function () {
    fixer.fixNameField({ name: 'foo' }, false)
  })

  assert.doesNotThrow(function () {
    fixer.fixNameField({ name: 'foo' })
  })

  assert.throws(function () {
    fixer.fixNameField({ name: 'Foo' }, true)
  }, new Error('Invalid name: "Foo"'), 'should throw an error')

  assert.throws(function () {
    fixer.fixNameField({ name: 'Foo' }, { strict: true })
  }, new Error('Invalid name: "Foo"'), 'should throw an error')

  assert.doesNotThrow(function () {
    fixer.fixNameField({ name: 'Foo' }, { strict: true, allowLegacyCase: true })
  })
})

test('non-string name throws error', function () {
  assert.throws(
    function () {
      fixer.fixNameField({ name: 123 }, true)
    },
    { name: 'Error', message: 'name field must be a string.' },
    'should throw error for number name'
  )

  assert.throws(
    function () {
      fixer.fixNameField({ name: { foo: 'bar' } }, true)
    },
    { name: 'Error', message: 'name field must be a string.' },
    'should throw error for object name'
  )

  assert.throws(
    function () {
      fixer.fixNameField({ name: ['array'] }, true)
    },
    { name: 'Error', message: 'name field must be a string.' },
    'should throw error for array name'
  )

  assert.throws(
    function () {
      fixer.fixNameField({ name: null }, true)
    },
    { name: 'Error', message: 'name field must be a string.' },
    'should throw error for null name'
  )
})
