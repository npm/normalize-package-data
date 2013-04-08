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

function fixRepositoryField (data, warn) {
  if (data.repostories) {
    warn("'repositories' (plural) Not supported.\n" +
         "Please pick one as the 'repository' field");
    data.repository = data.repositories[0]
  }
  if (!data.repository) return;
  if (typeof data.repository === "string") {
    data.repository = {
      type: "git",
      url: data.repository
    }
  }
  var r = data.repository.url || ""
  // use the non-private urls
  r = r.replace(/^(https?|git):\/\/[^\@]+\@github.com/, 
    '$1://github.com')
  r = r.replace(/^https?:\/\/github.com/, 
    'git://github.com')
  if (r.match(/github.com\/[^\/]+\/[^\/]+\.git\.git$/)) {
    warn("Probably broken git url: " + r)
  }
}

function fixFilesField (data, warn) {
  var files = data.files
  if (files && !Array.isArray(files)) {
    warn(file, data, "Invalid 'files' member")
    delete data.files
  }
}

function fixBinField (data, warn) {
  if (!data.bin) return;
  if (typeof data.bin === "string") {
    var b = {}
    b[data.name] = data.bin
    data.bin = b
  }
}

function fixManField (data, warn) {
  if (!data.man) return;
  if (typeof data.man === "string") {
    data.man = [ data.man ]
  }
}

function fixBundleDependenciesField (data, warn) {
  var bdd = "bundledDependencies"
  var bd = "bundleDependencies"
  if (data[bdd] && !data[bd]) {
    data[bd] = data[bdd]
    delete data[bdd]
  }
}

function fixDependencies (data, warn) {
  objectifyDeps(data, warn)
  addOptionalDepsToDeps(data, warn)
  fixBundleDependenciesField(data, warn)
}

function objectifyDeps (data, warn) {
  depTypes.forEach(function (type) {
    if (!data[type]) return;
    data[type] = depObjectify(data[type])
  })
}

function addOptionalDepsToDeps (data, warn) {
  var o = data.optionalDependencies
  if (!o) return;
  var d = data.dependencies || {}
  Object.keys(o).forEach(function (k) {
    d[k] = o[k]
  })
  data.dependencies = d  
}

function depObjectify (deps) {
  if (!deps) return {}
  if (typeof deps === "string") {
    deps = deps.trim().split(/[\n\r\s\t ,]+/)
  }
  if (!Array.isArray(deps)) return deps
  var o = {}
  deps.forEach(function (d) {
    d = d.trim().split(/(:?[@\s><=])/)
    var dn = d.shift()
    var dv = d.join("")
    dv = dv.trim()
    dv = dv.replace(/^@/, "")
    o[dn] = dv
  })
  return o
}

function fixNameField (data, warn) {
  if (!data.name) {
    data.name = ""
    return true
  }
  data.name = data.name.trim()
  ensureValidName(data.name)
}

function ensureValidName (name) {
  if (name.charAt(0) === "." ||
      name.match(/[\/@\s\+%:]/) ||
      name !== encodeURIComponent(name) ||
      name.toLowerCase() === "node_modules" ||
      name.toLowerCase() === "favicon.ico") {
        throw new Error("Invalid name: " + JSON.stringify(name))
  }
}

function fixKeywordsField (data) {
  var kw = data.keywords
  if (typeof kw === "string") {
    kw = kw.split(/,\s+/)
    data.keywords = kw
  }
}

function fixVersionField (data, warn) {
  if (!data.version) {
    data.version = ""
    return true
  }
  if (!semver.valid(data.version)) {
    throw new Error("invalid version: "+v)
  }
  data.version = semver.clean(data.version)
  return true
}

function fixPeople (data, warn) {
  modifyPeople(data, unParsePerson)
  modifyPeople(data, parsePerson)  
}

function modifyPeople (data, fn) {
  if (data.author) data.author = fn(data.author)
  ;["maintainers", "contributors"].forEach(function (set) {
    if (!Array.isArray(data[set])) return;
    data[set] = data[set].map(fn)
  })
  return data
}

function unParsePerson (person) {
  if (typeof person === "string") return person
  var name = person.name || ""
  var u = person.url || person.web
  var url = u ? (" ("+u+")") : ""
  var e = person.email || person.mail
  var email = e ? (" <"+e+">") : ""
  return name+email+url
}

function parsePerson (person) {
  if (typeof person !== "string") return person
  var name = person.match(/^([^\(<]+)/)
  var url = person.match(/\(([^\)]+)\)/)
  var email = person.match(/<([^>]+)>/)
  var obj = {}
  if (name && name[0].trim()) obj.name = name[0].trim()
  if (email) obj.email = email[1];
  if (url) obj.url = url[1];
  return obj
}