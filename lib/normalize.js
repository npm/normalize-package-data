module.exports = fixData

var extractDescription = require("./extract_description")
var isValid = require("./is_valid")
var fixer = require("./fixer")

var fieldsToFix = ['name','version','repository','files','bin','man','keywords']
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
  if (!data.readme) data.readme = "ERROR: No README data found!"
  if (data.modules) delete data.modules // modules field is deprecrated
  if (data.description && typeof data.description !== 'string') {
    warn("'description' field should be a string")
    delete data.description
  }
  if (data.readme && !data.description)
    data.description = extractDescription(data.readme)
}