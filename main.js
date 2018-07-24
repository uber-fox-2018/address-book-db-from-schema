const Controller = require("./controller.js");
const Contact = Controller.Contact;
const Group = Controller.Group;
const ContactGroup = Controller.ContactGroup;
const contactsData = require("./contacts.json")
const groupsData = require("./groups.json")
const contactGroupData = require("./contactGroups.json")

// Contact.save(contactsData);
// Contact.create({name: "ben", company: "DDD", phone: "081317644444", email: "ben@gmail.com"});
// Contact.lastId();
// Contact.update({name: "Bob"}, {id : 4})

Group.save(groupsData);
// Group.create({name: "coding"});
// Group.lastId();
// Group.update({name: "advertising"}, {id : 4})

// ContactGroup.save(contactGroupData);
// ContactGroup.create({contactId: 2, groupId: 1});
// ContactGroup.lastId();
// ContactGroup.update({contactId: 3, groupId: 2}, {id : 4})