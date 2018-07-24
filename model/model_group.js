const Group = require('./group')
const db = require('../db')

class GroupModel {
  static save(data, callback) {
    let group = new Group(data[0])
    let queryInsert = `INSERT INTO Groups (name_group)
                       VALUES ("${group.name_group}")`
    
    db.run(queryInsert, (err) => {
      if (err) {
        callback(err, null)
      } else {
        let message = {name_group: `${group.name_group}`}
        callback(null, message)
      }
    })
  }

  static update(data, callback) {
    let dataSplit = data[1].split(':')
    let id = Number(data[0])
    let column = dataSplit[0]
    let value = dataSplit[1]

    let queryUpdate = `UPDATE Groups SET ${column} = "${value}" WHERE id = ${id}`

    db.run(queryUpdate, (err) => {
      if (err) {
        callback(err, null)
      } else {
        let data = {"id": id}
        callback(null, data)
      }
    })
  }

  static remove(data, callback) {
    let id = Number(data[0].split(':')[1])
    let qDeleteGroup = `DELETE FROM Groups WHERE id = ${id}`
    let qDeleteContactGroup = `DELETE FROM ContactGroups WHERE group_id = ${id}`

    db.run(qDeleteGroup, (err) => {
      if (err) {
        callback(err, null)
      }
    })
    db.run(qDeleteContactGroup, (err) => {
      if (err) {
        callback(err, null)
      } 
      let message = {"id": id}
      callback(null, message)
    })
  }
}

module.exports = GroupModel