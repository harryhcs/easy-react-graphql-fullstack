require('dotenv').load();

module.exports = {
  client: 'sqlite',
  useNullAsDefault: true,
  connection: {
    filename: './prod.sqlite3',
  },
};
