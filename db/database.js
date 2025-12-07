import fs from 'fs'; //file system node module
import Database from 'better-sqlite3';
const filepath = './db/models/boards.db';


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
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `).run();

    db.prepare(`
    CREATE TABLE sticky_notes
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      board_id INTEGER,
      canvas TEXT,
      color TEXT NOT NULL,
      x_position REAL NOT NULL,
      y_position REAL NOT NULL,
      width INTEGER,
      height INTEGER,
      z_index INTEGER DEFAULT 0,
      FOREIGN KEY (board_id) REFERENCES boards(id)
    );
  `).run();
}

export default createDbConnection();