// Update with your config settings.
const path = require('path');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  default: {
    client: 'sqlite3',
    connection: {
      // filename: './dev.sqlite3',
      filename: path.resolve(__dirname, 'cache.sqlite3'),
    },
    useNullAsDefault: true,
  },
};
