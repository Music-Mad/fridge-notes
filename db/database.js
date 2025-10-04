const fs = require('fs'); //file system node module
const filepath = './db/models/boards.db';
const Database = require('better-sqlite3');

function createDbConnection() {
    //check if db files already exists
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
  db.prepare(`
    CREATE TABLE boards
    (
      id INTEGER PRIMARY KEY,
      username VARCHAR(50) NOT NULL
    );
  `).run();

    db.prepare(`
    CREATE TABLE sticky_notes
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      board_id INTEGER,
      content TEXT NOT NULL,
      FOREIGN KEY (board_id) REFERENCES boards(id)
    );
  `).run();
}

module.exports = createDbConnection();