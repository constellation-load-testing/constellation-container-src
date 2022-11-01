const db = require('../db/dbfunctions/db');
async function sendObjToSQLite(objectToSend) {
  try {
    await db.addByTableName('cache', { 
      timestamp: Date.now(),
      data: JSON.stringify(objectToSend) 
    })
  } catch(e) {
    console.log(e)
  }
}

module.exports = sendObjToSQLite;
