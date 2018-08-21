normalizeData = require('normalize-package-data')
packageData = require(process.cwd() + "/package.json")
warnFn = function(msg) { console.error(msg) }
normalizeData(packageData, warnFn)
