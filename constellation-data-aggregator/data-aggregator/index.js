// create express app
const express = require("express");
const app = express();
const cors = require('cors');
const body = require("body-parser");

let timestamp = require("./data/timestamp");

const sendObjToDb = require("./services/sendObjToDb");

const createTimestampIfUndefined = require("./utils/createTimestamp.js");
const reqObjectParser = require("./utils/reqObjectParser");
const resetObjectToSend = require("./utils/resetObjectToSend");
const createAggregateObject = require("./utils/createAggregateObject");

app.use(cors());
app.use(body.json());

const writeToTimeStream = require("./services/writeToTimeStream");
const { getCache } = require("./db/dbfunctions/db");

app.post("/test", async (req, res) => {
  try {
    let objectToSend = resetObjectToSend();
    timestamp = createTimestampIfUndefined(timestamp);
    reqObjectParser(req.body, objectToSend);
    console.log(objectToSend)
    timestamp = Date.now();
    await sendObjToDb(objectToSend);
    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

