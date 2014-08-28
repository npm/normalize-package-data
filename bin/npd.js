#!/usr/bin/env node

var normalize = require("../lib/normalize");
var fs = require('fs');
var path = require('path');
var pkg = "";

process.stdin.setEncoding('utf8');

if (process.stdin.isTTY) {
  console.log("\nUsage");
  console.log("$ cat package.json | normalize-package-data");
  console.log("$ cat package.json | normalize-package-data > package.json\n");
  process.exit();
}

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) pkg += chunk;
});

process.stdin.on('end', function() {
  pkg = JSON.parse(pkg);
  normalize(pkg);

  // Remove hidden/unwanted properties
  delete pkg.readme;
  delete pkg._id;

  process.stdout.write(JSON.stringify(pkg, null, 2));
});
