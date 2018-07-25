const db = require('./db_setting');

const createTableContactsSql = 
    `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone_number TEXT,
        email TEXT UNIQUE
    )`;

const createTableGroupsSql = 
    `CREATE TABLE IF NOT EXISTS groups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`;

const createTableContactsGroupsSql =
    `CREATE TABLE IF NOT EXISTS contacts_groups(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_id INTEGER,
        group_id INTEGER,
        FOREIGN KEY(contact_id) REFERENCES contacts(id),
        FOREIGN KEY(group_id) REFERENCES groups(id)
    )`;

const dropTableSql = table_name => {
    return `DROP TABLE IF EXISTS ${table_name}`;
};

const setup = () => {
    db.serialize(() => {
        db.run(dropTableSql('contacts'));
        db.run(dropTableSql('groups'));
        db.run(dropTableSql('contacts_groups'));
        db.run(createTableContactsSql);
        db.run(createTableGroupsSql);
        db.run(createTableContactsGroupsSql);
    });
}

setup();