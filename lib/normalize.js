module.exports = fixData

var semver = require("semver")
var extractDescription = require("./extract_description")
var isValid = require("./is_valid")

var depTypes = ["dependencies","devDependencies","optionalDependencies"]

function fixData (data, warn) {
  isValid(data, warn) // don't care if it's valid, we'll make it valid
  data.gypfile = (data.scripts && 
                  data.scripts.install === "node-gyp rebuild" && 
                  !data.scripts.preinstall)
  fixNameField(data, warn)
  fixVersionField(data, warn)
  data._id = data.name + "@" + data.version
  fixRepositoryField(data, warn)
  fixFilesField(data, warn)
  fixBinField(data, warn)
  fixManField(data, warn)
  fixKeywordsField(data, warn)
  fixPeople(data, warn)
  fixDependencies(data, warn)
  if (!data.readme) data.readme = "ERROR: No README data found!"
  if (data.modules) delete data.modules // modules field is deprecrated
  if (data.description && typeof data.description !== 'string') {
    warn("'description' field should be a string")
    delete data.description
  }
  if (data.readme && !data.description)
    data.description = extractDescription(data.readme)
}