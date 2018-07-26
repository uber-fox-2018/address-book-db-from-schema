const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./addressBook.db');

class Group {
  constructor(name){
    this.name = name
  }
}

class Model {

  static insert (dataStr, cb){
    let newGroup = new Group (dataStr);
    let keys = (Object.keys(newGroup)).join(', ');
    let totalData;

    let qReadAll = `SELECT * FROM 'Groups'`;
    let qInsert = `INSERT INTO 'Groups' (${keys}) VALUES ('${dataStr}')`;

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
          return cb(null, {message: `${JSON.stringify(newGroup)} saved successfully. Total group : ${totalData}`});
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
    let qUpdate = `UPDATE 'Groups' SET ${setStr} WHERE id = ${id}`;
    
    db.run(qUpdate, (err) => {
      if (err) {
        return cb (err, null);
      } else {
        return cb(null, {message: `data with id:${id} updated succesfully`});
      }
    });
  }

  static remove (id, cb){
    let qRemoveGroup = `DELETE FROM 'Groups' WHERE id = ${id}`
    let qRemoveContactGroup = `DELETE FROM ContactGroups WHERE groupId = ${id}`;
    db.serialize(()=> {
      db.run(qRemoveContactGroup, (err) => {
        if (err) {
          return cb (err, null);
        }
      });

      db.run(qRemoveGroup, (err) => {
        if (err) {
          return cb (err, null);
        } else {
          return cb(null, {message: `data with id:${id} deleted succesfully`});
        }
      });
    })
  }
}

module.exports = Model;