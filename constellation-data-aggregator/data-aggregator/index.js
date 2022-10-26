// create express app
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/dbfunctions/db.js");

let timestamp = require("./utils/timestamp");
let objectToSend = require("./utils/objectToSend");
const createTimestampIfUndefined = require("./utils/createTimestamp.js");

app.use(cors());
app.use(bodyParser.json());

app.post("/test", async (req, res) => {
  try {
    timestamp = createTimestampIfUndefined(timestamp);
    objectToSend[Date.now()] = req.body;
    console.log(timestamp)
    if ((Date.now() - timestamp)/1000 >= 10) {
      // send to SQLite
      timestamp = Date.now();
      console.log(objectToSend)
      await db.addByTableName('test', {data: JSON.stringify(objectToSend)})
      objectToSend = {};
    }
    res.status(200).send("success");

  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  } 
})

app.get("/test", async (req, res) => {
  const data = await db.getByTableName('test');
  res.json({message: data});
});

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

