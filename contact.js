const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

class Contacts {
  constructor() {
    
  }

  save(name, phoneNumber, company, email, createHandler) {
    let create = `
      INSERT INTO contacts (name, phoneNumber, company, email)
      VALUES ("${name}", ${phoneNumber}, "${company}", "${email}");
    `;

    db.run(create, err => {
      let notifications = '';
      err ? notifications = err : notifications = 'contact saved';
      createHandler(notifications);
    });

  }

  read(read, readHandler) {
    let contactFile = fs.readFileSync('./contacts.csv', 'utf8');
  }

  update(contactId, name, phoneNumber, company, email, updateHandler) {
    let update = `
      UPDATE contacts 
      SET name = "${name}", phoneNumber = ${phoneNumber}, company = "${company}", email = "${email}"
      WHERE contactId = ${contactId}
    `;

    db.run(update, err => {
      let notifications = '';
      err ? notifications = err : notifications = 'contact updated';
      updateHandler(notifications);
    });

  }

  delete(contactId, deleteHandler) {
    let erase = `DELETE FROM contacts WHERE contactId = ${contactId}`;
    db.run(erase, err => {
      let notifications = '';
      err ? notifications = err : notifications = 'contact deleted';
      deleteHandler(notifications);
    });
  }

}

// let contact = new Contact();

// contact.read()
// contact.save('didi', 087865123456, 'didicastle', 'didi@gmail.com');
// contact.update(1, 'ifhanKM', 081803618119, 'dexaMedica', 'wifs@gmail.com');

module.exports = Contacts;