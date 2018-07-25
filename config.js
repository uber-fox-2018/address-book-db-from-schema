const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./addressbook.db');

module.exports = db