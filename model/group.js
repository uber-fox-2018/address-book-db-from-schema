var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./address_book.db");

class Group {
  constructor(name) {
    this.id = null;
    this.name = name;
    this.peoples = [];
  }

  save(cb) {
    let query = `INSERT INTO Groups (name) VALUES ("${this.name}")`;

    let that = this;
    db.run(query, function(err) {
      if (err) {
        console.log(err.message);
        cb(err.message);
      } else {
        that.id = this.lastID;
        let info = `Added ${that.name} to Groups with id: ${that.id}`;
        cb(info);
      }
    });
  }

  update(id, value, cb) {
    let query = `UPDATE Groups
    SET name = "${value}"
    WHERE id = "${id}"`;

    db.run(query, function(err) {
      if (err) {
        cb(err.message)
      } else {
        let info = `edited to ${value} to row name in Table Group`;
        cb(info);
      }
    });
  }

  remove(id, cb) {
    let query = `DELETE FROM Groups
    WHERE id = "${id}"`;

    db.run(query, function(err) {
      if (err) {
        cb(err.message)
      } else {
        let info = `deleted id ${id} from table Groups`;
        cb(info);
      }
    });
  }

  show(id,cb) {
    let query = `SELECT Contacts.name FROM Contacts  left JOIN Groups ON GroupsContacts.contactId=Contacts.id left Join GroupsContacts ON GroupsContacts.groupId=Groups.id where Groups.id = "${id}"`
    db.all(query, function(err, data) {
      if (err) {
        cb(err.message,null);
      } else {
        if(data.length){
          cb(null,data);
        }else{
          cb(`Member not exist`)
        }
      }
    });
  }
}

module.exports = Group;
