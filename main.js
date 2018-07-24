const argv = process.argv.slice(2);
const command = argv [0];
const Controller = require('./controller');
const controller = new Controller();

switch(command) {
  case 'add': {
    let tableName = argv[1];
    let name = argv[2];
    let phoneNumber = argv[3];
    let company = argv[4];
    let email = argv[5];
    controller.save(tableName, name, phoneNumber, company, email);
    break;
  };

  case 'update': {
    let tableName = argv[1];
    let contactId = argv[2]
    let name = argv[3];
    let phoneNumber = argv[4];
    let company = argv[5];
    let email = argv[6];
    controller.update(tableName, contactId, name, phoneNumber, company, email);
    break;
  };

  case 'delete': {
    let tableName = argv[1];
    let contactId = argv[2];
    controller.delete(tableName, contactId);
    break;
  };

  default: break;

}