var tap = require("tap")
var normalize = require("../lib/normalize")
var path = require("path")
var fs = require("fs")
var _ = require("underscore")
var async = require("async")

var data, clonedData

tap.test("cosistent normalization", function(t) {
  path.resolve(__dirname, "./fixtures/read-package-json.json")
  fs.readdir (__dirname + "/fixtures", function (err, entries) {
    verifyConsistency = function(entryName, next) {
      filename = __dirname + "/fixtures/" + entryName
      fs.readFile(filename, function(err, contents) {
        if (err) return next(err)
        data = JSON.parse(contents.toString())
        normalize(data)
        clonedData = _.clone(data)
        normalize(data)
        t.deepEqual(data, clonedData, 
          "Normalization of " + entryName + "is consistent.")
        next(null)
      }) // fs.readFile
    } // verifyConsistency
    async.forEach(entries, verifyConsistency, function(err) {
      if (err) throw err
      t.end()
    })
  }) // fs.readdir
}) // tap.test