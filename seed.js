const fs = require('fs');

const db = require('./db_setting');

let contacts = JSON.parse(fs.readFileSync('./seeds/seed_contacts.json'));
let groups = JSON.parse(fs.readFileSync('./seeds/seed_groups.json'));
let contacts_groups = JSON.parse(fs.readFileSync('./seeds/seed_contacts_groups.json'));

const seed = () => {
    db.serialize(() => {
        contacts.forEach(row => {
            db.run(`INSERT INTO contacts (name, phone_number, email) VALUES (?,?,?)`, Object.values(row));
        });
        groups.forEach(row => {
            db.run(`INSERT INTO groups (name) VALUES (?)`, Object.values(row));
        })
        contacts_groups.forEach(row => {
            db.run(`INSERT INTO contacts_groups (contact_id, group_id) VALUES (?,?)`, Object.values(row));
        })
    });   
}

seed();