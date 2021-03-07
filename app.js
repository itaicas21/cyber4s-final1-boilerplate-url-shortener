require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const shortRequests = require("./shortRequests");
const statistics = require("./statistics");
const fs = require("fs");
const databaseHandler = require("./backend/databaseHandler");
const databaseFileLocation =
  process.env.NODE_ENV === "development"
    ? "./backend/devShortURLS.json"
    : process.env.NODE_ENV === "test"
    ? "./backend/testShortURLS.json"
    : "./backend/shortURLS.json";

app.use("/api/statistics", statistics);

app.use("/api/shorturl", shortRequests);

app.use(cors());

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/saved", (req, res) => {
  // change to async readFile
  res.json(JSON.parse(fs.readFileSync(databaseFileLocation)));
});

app.get("/:short_ID", (req, res) => {
  const shortID = req.params.short_ID;
  databaseHandler.readFile(databaseFileLocation).then((content) => {
    const parsedContent = JSON.parse(content);
    const found = databaseHandler.checkForExistingData(parsedContent, shortID);
    if (found) {
      databaseHandler.updateRedirectCount(
        databaseFileLocation,
        parsedContent,
        found
      );
      return res.redirect(found.URL);
    } else {
      return res.send("NO ID");
    }
  });
});

module.exports = app;
