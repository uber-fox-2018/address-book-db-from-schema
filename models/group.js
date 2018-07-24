const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

class Group {
  constructor(name){
    this.name = name
  }


}

module.exports = Group;