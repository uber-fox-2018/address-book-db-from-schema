const Contact = require("../model/contact");
const Group = require("../model/group");
const View = require("../view");

let view = new View();
let contact = new Contact();
let group = new Group();

class GroupController {
  c_addGroup(name) {
    let group = new Group(name);
    group.save((err, msg) => {
      if (err) {
        view.display(err);
      } else {
        view.display(msg);
      }
    });
  }

  c_updateGroup(id, value) {
    group.name = value;
    // contact.office = value;
    // contact.phone = value;
    // contact.email = value;
    group.update(id, value, (err, msg) => {
      if (err) {
        view.display(err);
      } else {
        view.display(msg);
      }
    });
  }

  c_deleteGroup(id) {
    group.remove(id, (err, msg) => {
      if (err) {
        view.display(err);
      } else {
        view.display(msg);
      }
    });
  }

  c_showGroup(id) {
    group.show(id, (err, msg) => {
      if (err) {
        view.display(err);
      } else {
        view.display(msg);
      }
    });
  }
}

module.exports = GroupController;
