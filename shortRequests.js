const utils = require("./utils");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");
const { resourceUsage } = require("process");
require("dotenv").config();
const check = RegExp(
  /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/
);
const databaseFileLocation =
  process.env.NODE_ENV === "development"
    ? "./backend/devShortURLS.json"
    : process.env.NODE_ENV === "test"
    ? "./backend/testShortURLS.json"
    : "./backend/shortURLS.json";

const dataBaseHandler = require("./backend/databaseHandler");

router.use(express.urlencoded({ extended: false }));

router.post("/new", async (req, res) => {
  const URLRequested = req.body.url;
  if (!check.test(URLRequested)) {
    return res.send("Invalid URL");
  }
  try {
    await fetch(URLRequested);
    dataBaseHandler.readFile(databaseFileLocation).then((content) => {
      const parsedContent = JSON.parse(content);
      const found = dataBaseHandler.checkForExistingData(
        parsedContent,
        URLRequested
      );
      if (found) {
        res.send({ URL: found.URL, short_ID: found.short_ID });
      } else {
        const newDataSet = dataBaseHandler.updateFile(
          databaseFileLocation,
          dataBaseHandler.createDataSet(URLRequested),
          parsedContent
        );
        res
          .status(201)
          .send({ URL: newDataSet.URL, short_ID: newDataSet.short_ID });
      }
    });
    return;
  } catch (error) {
    return res.status(404).send(error);
  }
});
module.exports = router;
