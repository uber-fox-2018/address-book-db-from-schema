const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

class Contact {
  constructor(inputArr){
    this.name = inputArr[0]
    this.company = inputArr[1]
    this.phoneNumber = inputArr[2]
    this.address = inputArr[3]
  }
}

class Model {

  static insert (dataArr, cb){
    let dataValues = [];
    dataArr.forEach((data) => {
      dataValues.push(`'${data}'`);
    })
    let dataStr = dataValues.join(', ');
    let newContact = new Contact (dataArr);
    console.log(newContact)
    let keys = (Object.keys(newContact)).join(', ');
    let totalData;

    let qReadAll = `SELECT * FROM 'Contacts'`;
    let qInsert = `INSERT INTO 'Contacts' (${keys}) VALUES (${dataStr})`;

    db.serialize(() => {
      db.all(qReadAll, (err, rows) => {
        if (err){
          return cb (err, null);
        } else {
          totalData = rows.length + 1;
        }
      })

      db.run (qInsert, (err) => {
        if (err) {
          return cb (err, null);
        } else {
          return cb(null, {message: `${JSON.stringify(newContact)} saved successfully. Total contact : ${totalData}`});
        }
      })
    })
  }

  static update (inputArr, cb){
    db.run (`INSERT INTO 'Contacts' (${keys}) VALUES ('${newContact.name}', '${newContact.company}', '${newContact.phoneNumber}', '${newContact.address}')`, (err) => {
      if (err) {
        return cb (err, null);
      } else {
        return cb(null, {message: `${newContact} saved successfully. Total contact : ${total}`});
      }
    })
  }
}

module.exports = Model;