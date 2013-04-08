module.exports = fixData

var isValid = require("./is_valid")
var fixer = require("./fixer")

var fieldsToFix = ['name','version','description','repository','files','bin','man','keywords','readme']
var thingsToFix = ['dependencies','people']

function ucFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
} 
function fixData (data, warn) {
  isValid(data, warn) // don't care if it's valid, we'll make it valid
  if (data.scripts && 
      data.scripts.install === "node-gyp rebuild" && 
      !data.scripts.preinstall) {
    data.gypfile = true
  }
  fixer.warn = warn
  fieldsToFix.forEach(function(fieldName) {
    fixer["fix" + ucFirst(fieldName) + "Field"](data)
  })
  thingsToFix.forEach(function(thingName) {
    fixer["fix" + ucFirst(thingName)](data)
  })
  data._id = data.name + "@" + data.version
  if (data.modules) delete data.modules // modules field is deprecrated
}