const modelContact = require('./contact')
const modelGroup = require('./group')
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

    listContact(){
        this.contact.readContact((cbRead)=>{
            View.display(cbRead)
        })
    }

    updateContact(){
        let id      = this.command[1]
        let name    = this.command[2]
        let company = this.command[3]
        let phone   = this.command[4]
        let email   = this.command[5]

        this.contact.upContact(id, name, company, phone, email, (cbUpdateContact) => {
            View.display(cbUpdateContact)
        })

    }

    deleteContact(){
        let id = this.command[1]

        this.contact.delContact(id, (cbDeleteContact) => {
            View.display(cbDeleteContact)
        })
    }

    createGroup(){
        let name = this.command[1]

        this.group.addGroup(name, (cbAddGroup) => {
            View.display(cbAddGroup)
        })
    }

    listGroup(){
        this.group.readGroup((cbRead) => {
            View.display(cbRead)
        })
    }

    updateGroup(){
        let id   = this.command[1]
        let name = this.command[2]
        this.group.upGroup(id, name, (cbUpdateGroup) => {
            View.display(cbUpdateGroup)
        })
    }

    deleteGroup(){
        let id = this.command[1]

        this.group.delGroup(id, (cbDeleteGroup) => {
            View.display(cbDeleteGroup)
        })
    }

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