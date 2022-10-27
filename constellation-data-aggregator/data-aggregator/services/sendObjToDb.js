const db = require('../db/dbfunctions/db');
async function sendObjToDb(objectToSend) {
  try {
    await db.addByTableName('cache', { data: JSON.stringify(objectToSend) })
  } catch(e) {
    console.log(e)
  }
}

module.exports = sendObjToDb;