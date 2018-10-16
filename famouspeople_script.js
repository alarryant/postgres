const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let queryInput = process.argv[2];
let queryCriterion = 'first_name';
let table = 'famous_people'
let sqlQuery = `SELECT * FROM ${table} WHERE ${queryCriterion} LIKE '${queryInput}'`;

function printResult(resultArray) {
  console.log(`Found ${resultArray.length} person(s) by the name '${queryInput}':`);
  resultArray.forEach((item, i) => console.log(`- ${i + 1}: ${item.first_name} ${item.last_name}, born '${item.birthdate.toISOString().split('T')[0]}'`));
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(sqlQuery, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...");
    printResult(result.rows);
    client.end();
  });
});