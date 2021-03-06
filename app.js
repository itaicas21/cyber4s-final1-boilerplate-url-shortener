require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const shortRequests= require('./shortRequests');
const statistics= require('./statistics');
const fs= require("fs");

app.use(`api/statistics`, statistics);

app.use('/api/shorturl',shortRequests);

app.use(cors());

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/saved",(req,res)=>{
  res.json(JSON.parse(fs.readFileSync('./shortURLS.json')));
})

module.exports = app;
