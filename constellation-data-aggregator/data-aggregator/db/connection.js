const knex = require('knex');
const configCache = require('./knexfile-cache');
const env = 'default'
const connectionToCache = knex(configCache[env]);

module.exports = {
  connectionToCache
};