const defaultObj = require('../data/defaultObj');
const db = require('../db/dbfunctions/db');
async function sendObjToDb(objectToSend) {
  console.log(objectToSend)
  await db.addByTableName('test', {data: JSON.stringify(objectToSend)})
  objectToSend = defaultObj;
}

module.exports = sendObjToDb;