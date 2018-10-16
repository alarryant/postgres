const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.host,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let firstName = process.argv[2];
let lastName = process.argv[3];
let birthDate = process.argv[4];
let table = 'famous_people'

knex.insert({first_name: firstName, last_name: lastName, birthdate: birthDate})
  .into(`${table}`)
  .then(function() {
    return {inserted: true};
  })
  .then(function() {
    knex.destroy();
  });
