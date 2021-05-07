const { readFile } = require("fs/promises");
const { readFileSync } = require("fs");

async function main() {
  const [packageJson, ngJson] = await Promise.all([
    readFile("package.json", "utf8"),
    readFile("angular.json", "utf8"),
  ]);
  console.log(JSON.parse(packageJson).name);
  console.log(JSON.parse(ngJson).version);
}

main();
