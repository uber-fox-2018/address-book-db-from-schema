const db = require('./database')

class ModelContact {
    static insertContact(name, company, phoneNumber, email, callback) {
        let queryInsert = `
        INSERT INTO Contacts (name, company, phoneNumber, email)
        VALUES("${name}", "${company}", "${phoneNumber}", "${email}");
        `
        db.run(queryInsert, function(err) {
            (err) ? callback(err, null) : callback(null, this)
        })
    }

    static showContacts(callback) {
        let readQuery = `
        SELECT * FROM Contacts`
        db.all(readQuery, function(err, data) {
            (err) ? callback(err, null) : callback(null, data)
        })
    }

    static editContact(name, company, phoneNumber, email, id, callback) {
        let editQuery = `
        UPDATE Contacts 
        SET name = "${name}", 
        phoneNumber = "${phoneNumber}", 
        company = "${company}",
        email = "${email}"
        WHERE id = ${id}`
        db.run(editQuery, function(err) {
            (err) ? callback(err, null) : callback(null, `Contact has been chanced!`)
        })
    }

    static removeContact(name, callback) {
        let selectQuery = `SELECT * FROM Contacts WHERE name = "${name}"`
        db.get(selectQuery, function(err, row) {
            if(err) {
                callback(err, null)
            } else {
                let deleteConjuntionQuery = `DELETE FROM groupContacts WHERE id = ${row.id}`
                db.run(deleteConjuntionQuery)
                let deleteQuery = `
                DELETE FROM Contacts
                WHERE name = "${row.name}"`
                db.run(deleteQuery, function(err) {
                    if(err) {
                        callback(err)
                    } else {
                        callback(null, `Contact ${name} has been deleted!`)
                    } 
                })
            }
        })
    }
    
    static find(nameColumn, value, operand, operand2, callback) {
        let query = `SELECT * FROM Contacts
                    WHERE `
        switch (operand) {
            case '=' :
                query += `${nameColumn[0]} = "${value[0]}" ` 
                break;
            case '>':
                query += `${nameColumn[0]} > "${value[0]}" `
                break;
            case '<':
                query += `${nameColumn[0]} < "${value[0]}" `
                break;
            case 'like':
                query += `${nameColumn[0]} like "%${value[0]}%" `
            default:
        }

        switch (operand2) {
            case 'OR':
                if(operand === 'like') {
                    query += `OR ${nameColumn[1]} ${operand} "%${value[1]}%"`
                } else {
                    query += `OR ${nameColumn[1]} ${operand} "${value[1]}"`
                }
                break;
            case 'AND':
                if(operand === 'like') {
                    query += `AND ${nameColumn[1]} ${operand} %${value[1]}%`
                } else {
                    query += `AND ${nameColumn[1]} ${operand} ${value[1]}`
                }
                break;
            default:
        }
        db.all(query, function (err, data) {
            if(err) {
                callback(err, null)
            } else {
                callback(null, data)
            }
        })
        console.log(query);
        
    }
}

module.exports = ModelContact