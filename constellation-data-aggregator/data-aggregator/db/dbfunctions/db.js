const connection = require('../connection');

// tableName is 'test' by default
function getByTableName(tableName, db = connection) {
  return db(tableName).select();
}

function addByTableName(tableName, data, db = connection) {
  return db(tableName).insert(data);
}

module.exports = {
  getByTableName,
  addByTableName,
}