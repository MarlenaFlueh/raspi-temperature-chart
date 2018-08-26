const fs = require("fs");

const dataString = fs.readFileSync("data.json");
export const dataArray = JSON.parse(dataString);
