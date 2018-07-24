const Contact = require ('./controllers/contact');
const Group = require ('./controllers/group');
const ContactGroup = require ('./controllers/contactGroup');
const command = process.argv[2];
const input = process.argv.slice(3);

if (command == 'help'){
  Contact.help();
} else if (command == 'add'){

} else if (command == 'update'){

} else if (command == 'delete'){

} else if (command == 'show'){

} else {
  Contact.help();
}