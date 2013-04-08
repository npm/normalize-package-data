module.exports = fixData

var isValid = require("./is_valid")
var fixer = require("./fixer")

var fieldsToFix = ['name','version','description','repository'
                  ,'files','bin','man','keywords','readme']
var otherThingsToFix = ['dependencies','people']

var thingsToFix = fieldsToFix.map(function(fieldName) { 
  return ucFirst(fieldName) + "Field"
})
thingsToFix = thingsToFix.concat(otherThingsToFix)

function fixData (data, warn) {
  if(!warn) warn = function(msg) { /* noop */ }
  isValid(data, warn) // don't care if it's valid, we'll make it valid
  if (data.scripts && 
      data.scripts.install === "node-gyp rebuild" && 
      !data.scripts.preinstall) {
    data.gypfile = true
  }
  fixer.warn = warn
  thingsToFix.forEach(function(thingName) {
    fixer["fix" + ucFirst(thingName)](data)
  })
  data._id = data.name + "@" + data.version
  if (data.modules) delete data.modules // modules field is deprecated
}

function ucFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}