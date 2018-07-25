const ContactController = require('./controllers/contact_controller');
const GroupController = require('./controllers/group_controller');

let contact = new ContactController();
let group = new GroupController();

let commands = process.argv.slice(2);

switch (commands[0]) {
    case 'contact': {
        switch (commands[1]) {
            case 'show':
                contact.show();
                break;
            case 'create':
                contact.create(commands[2], commands[3], commands[4]);
                break;
            case 'update':
                contact.update(commands[2], commands[3], commands[4], commands[5]);
                break;
            case 'delete':
                contact.delete(commands[2]);
                break;
            default:
                contact.help()
                break;
        }
    } break;

    case 'group': {
        switch (commands[1]) {
            case 'show':
                group.show();
                break;
            case 'create':
                group.create(commands[2]);
                break;
            case 'update':
                group.update(commands[2], commands[3]);
                break;
            case 'delete':
                group.delete(commands[2]);
                break;
            case 'assign':
                group.assign(commands[2], commands[3]);
                break;
            default:
                group.help()
                break;
        }
    } break;

    default:
        contact.help();
        group.help();
        break;
}