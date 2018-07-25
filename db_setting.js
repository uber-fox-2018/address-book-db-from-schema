const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./address-book.db');

module.exports = db;