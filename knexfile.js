// Update with your config settings.

const settings = require("./settings");

module.exports = {

  development: {
    client: 'pg',
    version: '7.2',
    connection: {
      host : settings.host,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  }
};
