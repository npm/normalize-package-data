const test = require('node:test')
const assert = require('node:assert')

const normalize = require('../')

test('strict', function () {
  var threw

  try {
    threw = false
    normalize({ name: 'X' }, true)
  } catch (er) {
    threw = true
    assert.strictEqual(er.message, 'Invalid name: "X"')
  } finally {
    assert.strictEqual(threw, true)
  }

  try {
    threw = false
    normalize({ name: ' x ' }, true)
  } catch (er) {
    threw = true
    assert.strictEqual(er.message, 'Invalid name: " x "')
  } finally {
    assert.strictEqual(threw, true)
  }

  try {
    threw = false
    normalize({ name: 'x', version: '01.02.03' }, true)
  } catch (er) {
    threw = true
    assert.strictEqual(er.message, 'Invalid version: "01.02.03"')
  } finally {
    assert.strictEqual(threw, true)
  }

  // these should not throw
  var slob = { name: ' X ',
    version: '01.02.03',
    dependencies: {
      y: '>01.02.03',
      z: '! 99 $$ASFJ(Aawenf90awenf as;naw.3j3qnraw || an elephant',
    } }
  normalize(slob, false)
  assert.deepStrictEqual(slob,
    { name: 'X',
      version: '1.2.3',
      dependencies:
            { y: '>01.02.03',
              z: '! 99 $$ASFJ(Aawenf90awenf as;naw.3j3qnraw || an elephant' },
      readme: 'ERROR: No README data found!',
      _id: 'X@1.2.3' })
})
