const settings = require("./settings"); // settings.json
// const pg = require("pg");

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

function printResult(resultArray) {
  console.log(`Found ${resultArray.length} person(s) by the name '${queryInput}':`);
  resultArray.forEach((item, i) => console.log(`- ${i + 1}: ${item.first_name} ${item.last_name}, born '${item.birthdate.toISOString().split('T')[0]}'`));
};

let queryInput = process.argv[2];
let queryCriterion = 'first_name';
let table = 'famous_people'

knex.from(`${table}`)
  .select('*').where(`${queryCriterion}`, `like`, `%${queryInput}%`)
  .asCallback(function(err, rows) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...");
    printResult(rows);
    knex.destroy();
});



