const { version } = require("../package.json");
const { resolve, relative } = require("path");
const { writeFileSync } = require("fs-extra");

const gitInfo = { version: version };

const file = resolve(__dirname, "../src", "utils", "version.js");
writeFileSync(
  file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const VERSION_MANAGER = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`,
  { encoding: "utf-8" }
);

console.log(
  `Wrote version info ${gitInfo.version} to ${relative(
    resolve(__dirname, ".."),
    file
  )}`
);
