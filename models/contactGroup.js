const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

class ContactGroup {
  constructor(contactId, groupId){
    this.contactId = contactId
    this.groupId = groupId
  }


}

class Model {
  
}

module.exports = Model;