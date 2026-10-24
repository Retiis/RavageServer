const fs = require("fs");const path = require("path");
const content = require("../data/content.json");

function getContent(key) {
    let version = content[key];
    if (!version) return {};

    const [dir, ext] = version.split(";");
    const filePath = path.join(__dirname, "../data", dir, `${key}.${ext}`);

    if (ext === "json") return require(filePath);
    return fs.readFileSync(filePath, "utf8");
}

module.exports = { getContent };