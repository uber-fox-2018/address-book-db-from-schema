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

  static update (id, inputArr, cb){
    let arrQuery = []  
    for (let i = 0; i < inputArr.length - 1; i+=2){
      arrQuery.push(`${inputArr[i]} = '${inputArr[i + 1]}'`)
    }
    let setStr = arrQuery.join(', ');
    let qUpdate = `UPDATE 'Contacts' SET ${setStr} WHERE id = ${id}`;
    
    db.run(qUpdate, (err) => {
      if (err) {
        return cb (err, null);
      } else {
        return cb(null, {message: `data with id:${id} updated succesfully`});
      }
    });
  }

  static remove (id, cb){
    let qRemoveContact = `DELETE FROM Contacts WHERE id = ${id}`;
    let qRemoveContactGroup = `DELETE FROM ContactGroups WHERE contactId = ${id}`;

    db.serialize(() => {
      db.run(qRemoveContactGroup, (err) => {
        if (err) {
          return cb (err, null);
        }
      });

      db.run(qRemoveContact, (err) => {
        if (err) {
          return cb (err, null);
        } else {
          return cb(null, {message: `data with id:${id} deleted succesfully`});
        }
      });
    })
  }

  static show (id, cb){
    let qShow =`SELECT C.name, C.phoneNumber, C.address, G.name groupName FROM 'Contacts' C LEFT JOIN 'ContactGroups' CG ON C.id = CG.contactId LEFT JOIN 'Groups' G ON CG.groupId = G.id WHERE C.id = ${id}`
    db.all(qShow, (err, rows) => {
      if (err){
        return cb (err, null);
      } else {
        return cb (null, rows)
      }
    })
  }

  static find (inputArr, cb){
    let keywords = {}
    for (let i = 0; i < inputArr.length - 3; i+=2){
      keywords[inputArr[i]] = inputArr[i + 1];
    }
    let operator = inputArr[inputArr.length - 2];
    let option = inputArr[inputArr.length - 1];
    let keywordArr = [];
    let keywordStr = '';
    
    if (operator.toUpperCase() == 'LIKE'){
      for (let i in keywords){
        keywordArr.push(`C.${i} ${operator} '%${keywords[i]}%'`)
      }
    } else {
      for (let i in keywords){
        keywordArr.push(`C.${i} ${operator} '${keywords[i]}'`)
      }
    }

    keywordStr = keywordArr.join(` ${option} `)

    let qFind = `SELECT C.name, C.phoneNumber, C.address, G.name groupName FROM 'Contacts' C LEFT JOIN 'ContactGroups' CG ON C.id = CG.contactId LEFT JOIN 'Groups' G ON CG.groupId = G.id 
    WHERE ${keywordStr}`

    db.all(qFind, (err, rows)=> {
      if (err){
        return cb (err, null);
      } else {
        return cb (null, rows)
      }
    })
  }
}

module.exports = Model;