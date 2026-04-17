const fs = require("fs");

function loadData() {
  return JSON.parse(fs.readFileSync("./data.json", "utf8"));
}

function saveData(data) {
  fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
}

module.exports = { loadData, saveData };
