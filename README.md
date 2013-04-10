# normalize-package-data

normalize-package data exports a function that normalizes package metadata. This data is typically found in a package.json file, but in principle could come from any source - for example the npm registry.

## Installation

```
npm install normalize-package-data
```

## Usage

Basic usage is really simple. You call the function that normalize-package-data exports. Let's call it `normalizeData`.

```javascript
normalizeData = require('read-package-data')
packageData = fs.readfileSync("package.json")
normalizeData(packageData)
// packageData is now normalized
```

Optionally, you may pass a "warning" function. It gets called whenever the normalizeData function encounters something that doesn't look right. It indicates less than perfect input data.

```javascript
normalizeData = require('read-package-data')
packageData = fs.readfileSync("package.json")
warnFn = function(msg) { console.error(msg) }
normalizeData(packageData, warnFn)
// packageData is now normalized. Any number of warnings may have been logged.
```

If you don't provide a warning function, `normalizeData` functions silently.

### Potential exceptions

If the supplied data has an invalid name or version vield, `normalizeData` will throw an error. Depending on where you call `normalizeData`, you may want to catch these errors so can pass them to a callback.

## Credits

This code is based on read-package-json written by Isaac Schlueter.
