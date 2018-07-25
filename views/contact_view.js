class ContactView {
    constructor() { }

    static displayHelp() {
        console.log(`$ node main.js contact help #show commands for contacts.`);
        console.log(`$ node main.js contact show #show all contacts`);
        console.log(`$ node main.js contact create <name> <phone_number> <email> #create new contact.`);
        console.log(`$ node main.js contact update <id> <name> <phone_number> <email>`);
        console.log(`$ node main.js contact delete <id> <name> <phone_number> <email>`);
    }

    static displayShow(contact) {
        console.log(contact);
    }

    static displayAdd(contact, total) {
        console.log(`New contact saved.`);
        console.log(contact);
        console.log(`Total contact: ${total}`);
    }
    
    static displayUpdate(contact, changes) {
        console.log(`Contact updated.`);
        console.log(contact);
        console.log(`Total row changed: ${changes}`);
    }

    static displayDelete(total) {
        console.log(`Contact deleted`);
        console.log(`Total contacts: ${total}`);
    }

    static displayValidation(message) {
        console.log(message);
    }
}

module.exports = ContactView;