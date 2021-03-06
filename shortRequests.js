const utils = require("./utils");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");
const { resourceUsage } = require("process");
const check = RegExp(
  /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/
);
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/new", async (req, res) => {
  if (!check.test(req.body.url)) {
    return res.send("Invalid URL");
  }

  try {
    const response = await fetch(req.body.url);
    fs.readFile("./shortURLS.json", (error, content) => {
      // change to process.env.dev tenerary variable. One test and one bins
      if (error) {
        console.log("No file Exists");
        return;
      } else {
        const file = JSON.parse(content);
        if (
          // found=return object (maybe change .some array function?)
          file.some((URLItem) => {
            console.log(URLItem.URL + "  " + req.body.url);
            return URLItem.URL === req.body.url;
          })
        ) {
          res.send("found");
        } else {
          //create object
          res.send("created");
        }
      }
    });
    return;
  } catch (error) {
    // check if error is because of no internet
    return res.send("Invalid HostName " + error);
  }
});
module.exports = router;
