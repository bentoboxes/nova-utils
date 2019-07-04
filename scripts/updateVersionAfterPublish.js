#! /usr/bin/env node
var fs = require("fs");
var fileName = "package.json";
var incrementType = process.argv[2] || "patch";
var relativePkgPath = process.argv[3] || "../" + fileName;
var absolutePkgPath = process.argv[4] || "./" + fileName;
var localPkg = require(relativePkgPath);
var npmAPI = require("npm-api");

var npm = new npmAPI();
var repo = npm.repo(localPkg.name);
repo.prop("version").then(function(version) {
  updateVersion(relativePkgPath, absolutePkgPath, version, incrementType);
}, console.error);

String.prototype.contains = function(wordToSearch) {
  return this.indexOf(wordToSearch) > 0;
};

function SemanticVersion(major, minor, patch) {
  this.major = major;
  this.minor = minor;
  this.patch = patch;
}

SemanticVersion.prototype.incrementVersion = function(type) {
  switch (type) {
    case "major":
      this.major = ++this.major;
      break;
    case "minor":
      this.minor = ++this.minor;
      break;
    case "patch":
    default:
      this.patch = ++this.patch;
      break;
  }
};

function updateVersion(
  packageRelativePath,
  packageAbsolutePath,
  currentVersion,
  incrementType
) {
  var localPackageJSON = require(packageRelativePath);
  var semanticVersions = currentVersion.split(".");
  var semanticVersion = new SemanticVersion(
    semanticVersions[0],
    semanticVersions[1],
    semanticVersions[2]
  );
  semanticVersion.incrementVersion(incrementType);
  var updatedVersion = Object.values(semanticVersion).join(".");
  console.log("Current version: ", currentVersion);
  console.log("Updated version: ", updatedVersion);
  localPackageJSON.version = updatedVersion;

  fs.writeFile(
    packageAbsolutePath,
    JSON.stringify(localPackageJSON),
    "utf8",
    function(err) {
      if (err) return console.log(err);
      console.log("Package JSON updated successfully");
    }
  );
}
