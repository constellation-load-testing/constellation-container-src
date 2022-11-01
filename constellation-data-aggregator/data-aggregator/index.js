// create express app
const express = require("express");
const app = express();
const cors = require('cors');
const body = require("body-parser");

let timestamp = require("./data/timestamp");

const sendObjToDb = require("./services/sendObjToDb");

const reqObjectParser = require("./utils/reqObjectParser");
const resetObjectToSend = require("./utils/resetObjectToSend");

app.use(cors());
app.use(body.json());

app.post("/test", async (req, res) => {
	console.log(req.body['0']);
  try {
    let objectToSend = resetObjectToSend();
    reqObjectParser(req.body, objectToSend);
    await sendObjToDb(objectToSend);
    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
})

