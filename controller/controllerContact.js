const Contact = require("../model/contact.js");
const Group = require("../model/group");
const View = require("../view");

let view = new View();
let contact = new Contact();
let group = new Group();

class ContactController {
  c_addContact() {
    let contact = new Contact(name, office, phone, email);
    contact.save((err, msg) => {
      if (err) {
        view.display(err);
      } else {
        view.display(msg);
      }
      console.log(`${contact.id}===>` + contact.id);
    });
  }

  c_updateContact(id, value) {
    contact.name = value;

    contact.update(id, value, (err, msg) => {
      if (err) {
        view.display(err);
      } else {
        view.display(msg);
      }
    });
  }

  c_deleteContact(id) {
    contact.remove(id, (err, msg) => {
      if (err) {
        view.display(err);
      } else {
        view.display(msg);
      }
    });
  }

  c_showContact(id) {
    contact.show(id, (err, msg) => {
      if (err) {
        view.display(err);
      } else {
        view.display(msg);
      }
    });
  }

  c_find(columnRow, constraint) {
    contact.findContact(columnRow, constraint, msg => {
      if (err) {
        view.display(err);
      } else {
        view.display(msg);
      }
    });
  }
}

module.exports = ContactController;
