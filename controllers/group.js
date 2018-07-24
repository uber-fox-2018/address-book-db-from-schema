const Model = require ('../models/group');
const View = require ('../views/view');

class Group {
  static help (){
    let messages = [
      `node main.js help`,
      `node main.js add contact <name> <phone number> <address>`,
      `node main.js add group <name>`,
      `node main.js add contactToGroup <contactId> <groupId>`,
      `node main.js update contact <id> <column name> <new data> <column name> <new data> <column name> <new data> ....`,
      `node main.js update group <id> name <new data>`,
      `node main.js update contactGroup <id> contactId OR groupId <new data>`,
      `node main.js delete contact <id>`,
      `node main.js delete group <id>`,
      `node main.js delete contactGroup <id>`,
      `node main.js show contact <column name> <keyword> <column name> <keyword>.... <operator> <option>`,
      `ex: node main.js show contact name brian company hacktiv LIKE OR`,
      `node main.js show group <id> OR <name>`
    ]
    messages.forEach((message) => {
      View.display(message);
    })
  }
}

module.exports = Group;