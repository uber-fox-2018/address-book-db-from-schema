const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

class GroupContacts {
  constructor() {

  }

  save(groupId, contactId) {
    let create = `
      INSERT INTO groupContacts (groupId, contactId)
      VALUES (${groupId}, ${contactId});
    `;

    db.run(create, err => {
      err ? console.log(err) : console.log('group contact saved');
    });
  }

  read() {
    let file = fs.readFileSync('./groupsContacts.csv', 'utf8');
  }

  update(groupContactsId, groupId, contactId) {
    let update = `
      UPDATE groupContacts
      SET contactId = ${contactId}, groupId = ${groupId}
      WHERE groupContactsId = ${groupContactsId}
    `;

    db.run(update, err => {
      err ? console.log(err) : console.log('group updated');
    });
  }

  delete(groupContactsId) {
    let erase = ` DELETE FROM groupContacts WHERE groupContactsId = ${groupContactsId};`;
    
    db.run(erase, err => {
      err ? console.log(err) : console.log('group contact deleted')
    });
  }

}

// let groupContacts = new GroupContacts()
// groupContacts.save(2, 3)


module.exports = GroupContacts;