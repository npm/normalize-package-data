#!/usr/bin/env node

var normalize = require("../lib/normalize");
var fs = require('fs');
var path = require('path');
var pkg = "";

process.stdin.setEncoding('utf8');

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
