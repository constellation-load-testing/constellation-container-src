const connection = require('../connection');

// tableName is 'test' by default
function getByTableName(tableName, db = connection) {
  return db(tableName).select();
}

function addByTableName(tableName, data, db = connection) {
  return db(tableName).insert(data);
}

// empties the cache table
function emptyCache(db = connection) {
  return db('cache').del();
}

// gets all items from cache table
function getCache(db = connection) {
  return db('cache').select();
}

// get all items between timeduration given timestamp
function getItemsBetweenTimeDurationInCache(timestamp, timeDuration, db = connection) {
  return db('cache')
    .select()
    .where('timestamp', '>', timestamp - timeDuration);
}

// write to the cache <-- hit for all the inbound requests
function setCache(data, db = connection) {
  return db('cache').insert(data);
}

// empties the permanent table
function emptyPermanent(db = connection) {
  return db('permanent').del();
}

// get all the items from the permanent table
function getPermanent(db = connection) {
  return db('permanent').select();
}

// write to the permanent table
function setPermanent(data, db = connection) {
  return db('permanent').insert(data);
}

/*
async function getAndDeleteFromCache() {
  const response = await getCache();
  await emptyCache();
  return response;
}
*/

module.exports = {
  getByTableName,
  addByTableName,
  emptyCache,
  getCache,
  setCache,
  emptyPermanent,
  getPermanent,
  setPermanent,
}