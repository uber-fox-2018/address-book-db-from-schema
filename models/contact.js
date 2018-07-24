const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

class Contact {
  constructor(name, company, phone, address){
    this.name = name
    this.company = company
    this.phoneNumber = phone
    this.address = address
  }

  insert (){

  }

}

module.exports = Contact;