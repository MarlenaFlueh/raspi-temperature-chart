const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// add data

const fetchData = () => {
  try {
    const dataArray = fs.readFileSync("data.json");
    return JSON.parse(dataArray);
  } catch (e) {
    return [];
  }
};

const addTemp = temperature => {
  let tempArray = fetchData();
  const currentTime = new Date().getHours();
  const newTemp = {
    degree: temperature,
    time: currentTime
  };

  tempArray.push(newTemp);
  fs.writeFileSync("data.json", JSON.stringify(tempArray));
};

const getArduinoData = arduinoTemp => {
  console.log(arduinoTemp);
  addTemp(arduinoTemp);
};

getArduinoData(24);

app.listen(process.env.PORT || 8080);
