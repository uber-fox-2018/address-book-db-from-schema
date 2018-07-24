const argv = process.argv.slice(2);

const MContact = require('./contact.js');
const MGroup = require('./group.js');
const MContactGroup = require('./contact-group.js');
const View = require('./view.js')

class Controller {
    constructor(input) {
        this._argv = input;
        this.modelContact = new MContact;
        this.modelGroup = new MGroup;
        this.modelContactGroup = new MContactGroup;
        this.routes();
    }

    addContact() {
        let name    = this._argv[1];
        let company = this._argv[2];
        let phone   = this._argv[3];
        let email   = this._argv[4];

        this.modelContact.addContact(name, company, phone, email);
        let msg = `Berhasil`;
        View.Display(msg)
    }

    contactList() {
        this.modelContact.contactList( (data) => {
            console.log(data);
        })
    }

    updateContact() {
        let id      = this._argv[1];
        let name    = this._argv[2];
        let company = this._argv[3];
        let phone   = this._argv[4];
        let email   = this._argv[5];
        this.modelContact.updateContact(id, name, company, phone, email);
        let msg = `Berhasil`;
        View.Display(msg)
    }

    deleteContact() {
        let id      = this._argv[1];
        this.modelContact.deleteContact(id);
        let msg = `Berhasil`;
        View.Display(msg)
    }

    ///////

    addGroup() {

    }

    groupList() {

    }

    updateGroup() {

    }

    deleteGroup() {

    }

    ////////////////

    addContactGroup() {

    }

    contactGroupList() {

    }

    updateContactGroup() {

    }

    deleteContactGroup() {

    }

    help() {
        console.log("Ntar ke view")
    }

    routes() {
        let cmd = this._argv[0];
        // console.log(cmd)
        switch (cmd) {
            case 'addContact':
                this.addContact();
                break;
            case 'contactList':
                this.contactList();
                break;
            case 'updateContact':
                this.updateContact();
                break;
            case 'deleteContact':
                this.deleteContact();
                break;

            case 'addGroup':
                this.addGroup();
                break;
            case 'groupList':
                this.groupList();
                break;
            case 'updateGroup':
                this.updateGroup();
                break;
            case 'deleteGroup':
                this.deleteGroup();
                break;

            case 'addContactGroup':
                this.addContactGroup();
                break;
            case 'contactGroupList':
                this.contactGroupList();
                break;
            case 'updateContactGroup':
                this.updateContactGroup();
                break;
            case 'deleteContactGroup':
                this.deleteContactGroup();
                break;

            default:
                this.help();
                break;
        }
    }

}

new Controller(argv)