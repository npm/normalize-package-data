var tap = require("tap")
var normalize = require("../lib/normalize")
var path = require("path")
var fs = require("fs")
var _ = require("underscore")

tap.test("normalization consistency", function (t) {
  var p = path.resolve(__dirname, "./fixtures/read-package-json.json")
  fs.readFile (p, function (err, contents) {
    if (err) throw err;
    var data = JSON.parse(contents.toString())
    normalize(data)
    var clonedData = _.clone(data)
    normalize(data)
    t.deepEqual(data, clonedData, "Normalized normalized is normalized.")
    t.end()
  })
})