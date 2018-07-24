var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./address_book.db");

class Contact {
  constructor(name, office, phone, email) {
    this.id = null;
    this.name = name;
    this.office = office;
    this.phone = phone;
    this.email = email;
  }

  save(cb) {
    let query = `INSERT INTO Contacts (name,office,phone,email)
VALUES("${this.name}", "${this.office}", "${this.phone}", "${this.email}");`;

    let that = this;
    db.run(query, function(err) {
      if (err) {
        cb(err.message);
      } else {
        that.id = this.lastID;
        let info = `Added ${that.name} to contacts`;
        cb(info);
      }
    });
  }

  update(id, value, cb) {
    let query = `UPDATE Contacts
    SET name = "${value}"
    WHERE id = "${id}"`;

    db.run(query, function(err) {
      if (err) {
        cb(err.message);
      } else {
        let info = `edited to ${value} to row name`;
        cb(info);
      }
    });
  }

  remove(id, cb) {
    let query = `DELETE FROM Contacts
    WHERE id = "${id}"`;

    db.run(query, function(err) {
      if (err) {
        cb(err.message);
      } else {
        let info = `deleted id ${id} from table Contacts`;
        cb(info);
      }
    });
  }

  show(id, cb) {
    let query = `SELECT Groups.name FROM Contacts  left JOIN GroupsContacts ON GroupsContacts.contactId = Contacts.id  left JOIN Groups ON GroupsContacts.groupId=Groups.id where Contacts.id = "${id}" `;
    db.all(query, function(err, data) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    });
  }

  findContact(columnRow, constraint, cb) {
    let arr = [];
    let dataFound;
    // let chooseConstraint=null
    // if(constraint==`like`){
    //   chooseConstraint
    // }
    for (var i = 0; i < columnRow.length; i += 2) {
      let column = [];
      let data = [];

      column.push(columnRow[i]);
      data.push(columnRow[i + 1]);

      let query = `SELECT * FROM Contacts WHERE ${column} ${constraint} "${data}" `;
      function findData() {
        db.each(query, function(err, element) {
          if (err) {
            cb(err.message, null);
          } else {
            return cb(null, element);
          }
        });
      }
      arr.push(findData());
      // console.log();
    }
  }
}

module.exports = Contact;
