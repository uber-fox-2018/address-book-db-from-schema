const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db');

class Groups {
  constructor() {

  }

  save(name, description, createHandler) {
    let create = `
      INSERT INTO groups (name, description)
      VALUES ("${name}", "${description}");
    `;

    db.run(create, err => {
      let notifications = '';
      err ? notifications = err : notifications = 'group saved';
      createHandler(notifications);
    });
  }

  read() {
    let groupFile = fs.readFileSync('./groups.csv', 'utf8');
  }

  update(groupId, name, description, updateHandler) {
    let update = `
      UPDATE groups 
      SET name = "${name}", description = "${description}"
      WHERE groupId = ${groupId}
    `;

    db.run(update, err => {
      let notifications = '';
      err ? notifications = err : notifications = 'group updated';
      updateHandler(notifications);
    });
  }

  delete(groupId, deleteHandler) {
    let erase = ` DELETE FROM groups WHERE groupId = ${groupId};`;
    db.run(erase, err => {
      let notifications = '';
      err ? notifications = err : notifications = 'group deleted';
      deleteHandler(notifications);
    });
  }

}

// let group = new Groups();

// group.save('lampaklampak', 'lampak lengan');
// group.update(2, 'Hacktiv8', 'Full-Stack JavaScript Developer')
// group.delete(1);

module.exports = Groups;
