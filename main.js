const Contact = require ('./controllers/contact');
const Group = require ('./controllers/group');
const ContactGroup = require ('./controllers/contactGroup');
const command = process.argv[2];
const target = process.argv[3];
const input = process.argv.slice(4);

if (command == 'help'){
  Contact.help();
} else if (command == 'add'){
  if (target == 'contact'){
    Contact.insert(input);
  } else if (target == 'group'){

  } else if (target == 'contactGroup'){

  }
} else if (command == 'update'){
  if (target == 'contact'){
    Contact.update(input)
  } else if (target == 'group'){

  } else if (target == 'contactGroup'){
    
  }
} else if (command == 'delete'){
  if (target == 'contact'){

  } else if (target == 'group'){

  } else if (target == 'contactGroup'){
    
  }
} else if (command == 'show'){
  if (target == 'contact'){

  } else if (target == 'group'){

  }
} else {
  Contact.help();
}