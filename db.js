const fs = require('fs'); //file system node module
const sqlite3 = require('sqlite3').verbose();
const filepath = './models/test.db';

function createDbConnection() {
    //if db already exists return connection
    if (fs.existsSync(filepath)) {
        return new sqlite3.Database(filepath);
    }
    //if not create table and return connection
    const db = new sqlite3.Database(filepath, (error) => {
        if (error) {
            return console.error(error.message);
        }
        createTable(db);
    });

    console.log('Connection with the SQLite has been established');
    return db;
}

function createTable(db) {
  db.exec(`
  CREATE TABLE codes
  (
    code INTEGER PRIMARY KEY,
    name   VARCHAR(50) NOT NULL
  );
`);
}

module.exports = createDbConnection();