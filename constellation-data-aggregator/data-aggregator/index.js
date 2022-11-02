// create express app
const express = require("express");
const app = express();
const cors = require('cors');
const body = require("body-parser");

const sendObjToSQLite = require('./services/sendObjToSQLite');

const resetObjectToSend = require("./utils/resetObjectToSend");
const fillObjectFromArray = require("./utils/fillObjectFromArray");

app.use(cors());
app.use(body.json());

app.post("/aggregator", async (req, res) => {
  try {
    let objectToSend = resetObjectToSend();
		const data = req.body;
    fillObjectFromArray(data, objectToSend)
    await sendObjToSQLite(objectToSend);
    res.status(200).send("success");
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
})

app.listen(3003, () => {
  console.log(`Server is listening on port 3003`);
})

