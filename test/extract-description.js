const { test } = require('node:test')
const assert = require('node:assert')
const extractDescription = require('../lib/extract_description.js')

test('returns undefined for falsy input (!d)', function () {
  assert.strictEqual(extractDescription(null), undefined)
  assert.strictEqual(extractDescription(undefined), undefined)
  assert.strictEqual(extractDescription(''), undefined)
  assert.strictEqual(extractDescription(0), undefined)
  assert.strictEqual(extractDescription(false), undefined)
})

test('returns undefined for ERROR message', function () {
  assert.strictEqual(extractDescription('ERROR: No README data found!'), undefined)
})

test('skips heading lines to reach s++ (lines starting with # or empty)', function () {
  const readme = `# Title
  
## Subtitle

This is the description.`
  assert.strictEqual(extractDescription(readme), 'This is the description.')
})

test('skips multiple headings and empty lines', function () {
  const readme = '# Main Title\n\nThis is the actual description text.\nAnd more description.'
  assert.strictEqual(extractDescription(readme), 'This is the actual description text. And more description.')
})

test('iterates through description lines to reach e++ (multi-line description)', function () {
  const readme = `# Title

This is line one of the description.
This is line two of the description.
This is line three of the description.

Another paragraph here.`
  assert.strictEqual(
    extractDescription(readme),
    'This is line one of the description. This is line two of the description. This is line three of the description.'
  )
})

test('stops at first empty line after description', function () {
  const readme = `Description line 1
Description line 2

This should not be included`
  assert.strictEqual(extractDescription(readme), 'Description line 1 Description line 2')
})

test('handles single line description', function () {
  const readme = 'Just a simple description'
  assert.strictEqual(extractDescription(readme), 'Just a simple description')
})

test('trims whitespace from description', function () {
  const readme = `  
  
  Description with leading spaces  

More content`
  assert.strictEqual(extractDescription(readme), 'Description with leading spaces')
})

test('handles description starting immediately after heading', function () {
  const readme = `# Heading
Description starts here
And continues here`
  assert.strictEqual(extractDescription(readme), 'Description starts here And continues here')
})
