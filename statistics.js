const { Router } = require("express");
const router = Router();
const databaseFileLocation =
  process.env.NODE_ENV === "development"
    ? "./backend/devShortURLS.json"
    : process.env.NODE_ENV === "test"
    ? "./backend/testShortURLS.json"
    : "./backend/shortURLS.json";

const databaseHandler = require("./backend/databaseHandler");

router.get("/:short_ID", async (req, res) => {
  const shortID = req.params.short_ID;
  return res.send(
    databaseHandler.checkForExistingData(
      JSON.parse(await databaseHandler.readFile(databaseFileLocation)),
      shortID
    )
  );
});

module.exports = router;
