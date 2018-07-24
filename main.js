const modelContact = require('./contact')
const modelGroup = require('./contact-group')
const modelGroupContact = require('./contact-group')
const View = require('./view')

const argv = process.argv.slice(2)

class Controller {
    constructor(input){
        this.command = input
        this.contact = new modelContact
        this.group = new modelGroup
        this.groupContact = new modelGroupContact
        this.control()
    }

    createContact(){
        let name    = this.command[1]
        let company = this.command[2]
        let phone   = this.command[3]
        let email   = this.command[4]

        this.contact.addContact(name, company, phone, email, (cbAddContact) => {
            View.display(cbAddContact)
        })
    }

    listContact(){}

    updateContact(){}

    deleteContact(){}

    createGroup(){}

    listGroup(){}

    updateGroup(){}

    deleteGroup(){}

    help(){}

    control(){
        let cmd = this.command[0]

        if(cmd === 'createContact'){
            this.createContact()
        } else if(cmd === 'listContact'){
            this.listContact()
        } else if(cmd === 'updateContact'){
            this.updateContact()
        } else if(cmd === 'deleteContact'){
            this.deleteContact()
        }

        else if(cmd === 'createGroup'){
            this.createGroup()
        } else if(cmd === 'listGroup'){
            this.listGroup()
        } else if(cmd === 'updateGroup'){
            this.updateGroup()
        } else if(cmd === 'deleteGroup'){
            this.deleteGroup()
        }

        else if(cmd === 'help'){
            this.help()
        }
    }

}

let com = new Controller(argv)