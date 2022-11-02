// create express app
const express = require("express");
const app = express();
const cors = require('cors');
const body = require("body-parser");

const sendObjToSQLite = require('./services/sendObjToSQLite');

const resetObjectToSend = require("./utils/resetObjectToSend");
const fillObjectToSend = require("./utils/fillObjectToSend");

app.use(cors());
app.use(body.json());

app.post("/aggregator", async (req, res) => {
  try {
    let objectToSend = resetObjectToSend();
		const data = req.body[Object.keys(req.body)[0]];
		console.log(data)
    fillObjectToSend(data, objectToSend)
    await sendObjToSQLite(objectToSend);
    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
})

app.listen(3003, () => {
  console.log(`Server is listening on port 3003`);
})

