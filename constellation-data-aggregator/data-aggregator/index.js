// create express app
const express = require("express");
const app = express();
const cors = require("cors");
const body = require("body-parser");

let timestamp = require("./data/timestamp");
const objectToSend = require("./data/objectToSend").objectToSend;

const defaultObj = require("./data/defaultObj");
const sendObjToDb = require("./services/sendObjToDb");

const createTimestampIfUndefined = require("./utils/createTimestamp.js");
const reqObjectParser = require("./utils/reqObjectParser");

app.use(cors());
app.use(body.json());

app.post("/test", async (req, res) => {
  try {
    timestamp = createTimestampIfUndefined(timestamp);
    console.log(objectToSend)
    reqObjectParser(req.body, objectToSend);
    if ((Date.now() - timestamp)/1000 >= 10) {
      timestamp = Date.now();
      sendObjToDb(objectToSend);
    }
    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  } 
})

// app.get("/test", async (req, res) => {
//   const data = await db.getByTableName('test');
//   res.json({message: data});
// });

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

