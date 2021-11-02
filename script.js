const glob = require("glob");
const fs = require("fs");
const path = require("path");

glob("packages/**/package.json", (er, filePaths) => {
  for (let filePath of filePaths) {
    const pkg = require(path.resolve(__dirname, filePath));

    delete pkg.exports;

    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2));
  }
});
