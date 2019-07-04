#! /usr/bin/env node
var path = require("path");
const shell = require("shelljs");

var incrementType = process.argv[2] || "patch";
var comment = process.argv[3];
var commitAndPushToGit = process.argv[4] || true;

function publishToNPM() {
  return shell.exec(
    "node scripts/updateVersionAfterPublish.js " +
      incrementType +
      " && npm publish --access public",
    publishToGit
  );
}

function publishToGit(code, stdout, stderr) {
  console.log("stdout", stdout);
  if (code === 0 && commitAndPushToGit) {
    if (!shell.which("git")) {
      shell.echo("Sorry, this script requires git");
      shell.exit(1);
    }
    console.log(
      "\n\nThe new version has been published successfully. Trying to upload the changes to the remote repository ... \n"
    );
    init();
  } else {
    console.log("Oops something went wrong!");
  }
}

function getPackageVersion() {
  var localPkg = require("../package.json") || { version: "UNKNOWN" };
  return localPkg.version;
}

function getGitComment(comment) {
  return comment || "Publish version number " + getPackageVersion();
}

function init() {
  formatWithPrettier();
}

function formatWithPrettier() {
  if (!shell.which("prettier")) {
    shell.echo("Unable to format package.json with prettier.");
    gitAdd();
  } else {
    var command = "prettier --write package.json";
    shell.exec(command, gitAdd);
  }
}

function gitAdd(code, stdout, stderr) {
  return shell.exec(
    "git add package.json src/utils/version.ts src/components.d.ts src/\\*.md",
    gitCommit
  );
}

function gitCommit(code, stdout, stderr) {
  if (code === 0) {
    console.log("Added to staging area correctly.");
    return shell.exec(
      'git commit -m "' + getGitComment(comment) + '"',
      gitPush
    );
  }
}

function gitPush(code, stdout, stderr) {
  if (code === 0) {
    console.log("Committed correctly.");
    return shell.exec("git push origin master", { silent: true }, showMessage);
  }
}

function showMessage(code, stdout, stderr) {
  if (code === 0) {
    console.log("Pushed to remote successfully.");
  } else {
    console.error(
      "Unable pushing to remote. Please push to remote manually. See out.log for more details."
    );
    shell.exec(stdout + "\n" + stderr + " > out.log");
  }
}

publishToNPM();
