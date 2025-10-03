const fs = require('fs'); //file system node module
const filepath = './models/test.db';
const Database = require('better-sqlite3');

function createDbConnection() {
    if (fs.existsSync(filepath)) {
        return new Database(filepath, {verbose: console.log});
    }
    //if not create table and return connection
    const db = new Database(filepath, {verbose: console.log});
    createTable(db);
    console.log('Connection with the SQLite has been established');
    return db;
}

function createTable(db) {
  info = db.prepare(`
    CREATE TABLE codes
    (
      code INTEGER PRIMARY KEY,
      name   VARCHAR(50) NOT NULL
    );
  ]`).run();
}

module.exports = createDbConnection();