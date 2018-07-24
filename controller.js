const Contact = require('./contact');
const Group = require('./group');
const GroupContact = require('./groupContacts');
const View = require('./view');

class Controller {
  constructor() {
    this.contact = new Contact();
    this.group = new Group();
    this.groupContact = new GroupContact();
    this.view = new View();
  }

  save(tableName, value1, value2, value3=null, value4=null) {
    switch(tableName) {
      case 'contact': {
        let name = value1;
        let phoneNumber = value2;
        let company = value3;
        let email = value4;
        let contact = this.contact.save(name, phoneNumber, company, email,  contactSaver => {
          this.view.save(contactSaver);
        });
        break;
      }
      case 'group': {
        let name = value1;
        let description = value2;
        let group = this.group.save(name, description, groupSaver => {
          this.view.save(groupSaver);
        });
        break;
      };
      case 'groupContact': {
        let groupId = value1;
        let contactId = value2;
        let groupContact = this.groupContact.save(groupId, contactId, groupContactSaver => {
          this.view.save(groupContactSaver);
        });
        break;
      };
    }

  }

  update(tableName, value1, value2, value3, value4, value5) {
    switch(tableName) {
      case 'contact': {
        let name = value1;
        let phoneNumber = value2;
        let company = value3;
        let email = value4;
        let contact = this.contact.update(name, phoneNumber, company, email, contactUpdater => {
          this.view.save(contact);
        });
        break;
      }

      case 'group': {
        let name = value1;
        let description = value2;
        let group = new Group(name, description, groupUpdater => {
          this.view.save(group);
        });
        break;
      };

      case 'groupContact': {
        let groupId = value1;
        let contactId = value2;
        let groupContact = new GroupContact(groupId, contactId, groupContactUpdater => {
          this.view(groupContact);
        });
        break;
      };

    }
  }

  delete(tableName) {
    switch(tableName) {
      case 'contact': {
        let name = value1;
        let phoneNumber = value2;
        let company = value3;
        let email = value4;
        let contact = new Contact(name, phoneNumber, company, email, contactDestroyer => {
          this.view.save(contactDestroyer);
        });
      }

      case 'group': {
        let name = value1;
        let description = value2;
        let group = new Group(name, description, groupDestroyer => {
          this.view.save(groupDestroyer);
        });
      };

      case 'groupContact': {
        let groupId = value1;
        let contactId = value2;
        let groupContact = new GroupContact(groupId, contactId, groupContactDestroyer => {
          this.view(groupContactDestroyer);
        });
      };

    }
  }


}

module.exports = Controller;