const { readFileSync, writeFileSync } = require("fs");

const files = [
  "./packages/bal/package.json",
  "./packages/types/package.json",
  "./packages/utilities/package.json"
];

files.forEach((fileName) => {
  const packageJson = JSON.parse(readFileSync(fileName).toString());
  packageJson.main = "dist/index.js";
  packageJson.types = "dist/index.d.js";
  writeFileSync(fileName, JSON.stringify(packageJson, null, 2));
});
