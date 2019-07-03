const Model = require ('../models/contact');
const View = require ('../views/view');

class Contact {
  static help (){
    let messages = [
      `node main.js help`,
      `node main.js add contact "<name>" <company> <phone number> "<address>"`,
      `node main.js add group "<name>"`,
      `node main.js add contactToGroup <contactId> <groupId>`,

      `node main.js update contact <id> <column name> "<new data>" <column name> "<new data>" <column name> "<new data>" ....`,
      `node main.js update group <id> name <new data>`,
      `node main.js update contactGroup <id> contactId OR groupId <new data>`,

      `node main.js delete contact <id>`,
      `node main.js delete group <id>`,
      `node main.js delete contactGroup <id>`,
      
      `node main.js show contact <id>`,

      `node main.js find contact <column name> "<keyword>" <column name> "<keyword>"... <operator> <option>`,
      `ex: node main.js find contact name "john" company "earth" LIKE OR`,
      `ex: node main.js find contact name "doe" company hacktiv = AND`,
    ]
    messages.forEach((message) => {
      View.display(message);
    })
  }

  static insert (inputArr){
    Model.insert (inputArr, (err, result)=> {
      if (err){
        View.display(err.message);
      } else {
        View.display(result.message);
      }
    })
  }

  static update (inputArr){
    Model.update (inputArr[0], inputArr.slice(1), (err, result)=> {
      if (err){
        View.display(err.message);
      } else {
        View.display(result.message);
      }
    })
  }

  static remove (input){
    Model.remove (input, (err, result)=> {
      if (err){
        View.display(err.message);
      } else {
        View.display(result.message);
      }
    })
  }

  static show (input){
    Model.show (input, (err, result)=> {
      if (err){
        View.display(err.message);
      } else {
        View.display(result);
      }
    })
  }

  static find (input){
    Model.find (input, (err, result)=> {
      if (err){
        View.display(err.message);
      } else {
        View.display(result);
      }
    })
  }
}

module.exports = Contact;