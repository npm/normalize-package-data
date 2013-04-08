var tap = require("tap")
var normalize = require("../lib/normalize")

tap.test("normalize some package data", function(t) {
  var packageData = require("./fixtures/read-package-json.json")
  var warnings = []
  normalize(packageData, function(warning) {
    warnings.push(warning)
  })
  // there's no readme data in this particular object
  t.equal( warnings.length, 1, "warnings.length") 
  t.end()
})