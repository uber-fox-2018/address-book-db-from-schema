const ContactController = require('./contactcontroller.js');
const GroupController = require('./groupcontroller.js');
const ContactGroupController = require('./contact-groupcontroller.js')

const argv = process.argv;
let table = argv[2];
let command = argv[3];

if (table == 'Contacts') {
    if(command == 'transferContacts') {
        ContactController.transferContacts();

    } else if (command == 'addContact') {
        let name = argv[4];
        let company_name = argv[5];
        let phone_number = argv[6];
        let email = argv[7];
        ContactController.createContact(name, company_name, phone_number, email);

    } else if (command == 'updateContact') {
        let id = argv[4];
        let column_name = argv[5];
        let value_edited = argv[6];
        ContactController.updateContact(id, column_name, value_edited);

    } else if (command == 'deleteContact') {
        let id = argv[4];
        ContactController.deleteContact(id);

    } else if (command == 'showContacts') {
        let id = argv[4];
        ContactController.showContacts(id);

    } else if (command == 'assignContact') {
        let contactName = argv[4];
        let groupName = argv[5];
        ContactController.assignContact(contactName, groupName);
    }


} else if (table == 'Groups') {
    if (command == 'transferGroups') {
        GroupController.transferGroups();

    } else if (command == 'addGroup') {
        let name = argv[4];
        GroupController.createGroup(name);

    } else if (command == 'updateGroup') {
        let id = argv[4];
        let column_name = argv[5];
        let value_edited = argv[6];
        GroupController.updateGroup(id, column_name, value_edited);

    } else if (command == 'deleteGroup') {
        let id = argv[4];
        GroupController.deleteGroup(id);

    } else if (command == 'showGroups') {
        let name = argv[4];
        GroupController.showGroups(name);
    }

} else if (table == 'ContactGroups') {
    if (command == 'transferContactGroups') {
        ContactGroupController.transferContactGroups();
    }
}