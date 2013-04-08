var tap = require("tap")
var fs = require("fs")
var path = require("path")
var normalize = require("../lib/normalize")

rpjPath = path.resolve(__dirname,"./fixtures/read-package-json.json")
tap.test("normalize some package data", function(t) {
  var packageData = require(rpjPath)
  var warnings = []
  normalize(packageData, function(warning) {
    warnings.push(warning)
  })
  // there's no readme data in this particular object
  t.equal( warnings.length, 1, "There's exactly one warning.")
  fs.readFile(rpjPath, function(err, data) {
    if(err) throw err
    // Various changes have been mode
    t.notEqual(packageData, JSON.parse(data), "Output is different from input.")
    t.end()
  })
})

tap.test("runs without passing warning function", function(t) {
  packageData = require(rpjPath)
  fs.readFile(rpjPath, function(err, data) {
    if(err) throw err
    normalize(JSON.parse(data))
    t.ok(true, "If you read this, this means I'm still alive.")
    t.end()
  })
})
