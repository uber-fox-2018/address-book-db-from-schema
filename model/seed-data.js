const fs = require('fs');
const db = require('./db');

class Seed{

    static contact(){
        let data = fs.readFileSync('dataDummy.json','utf8')
        let dataParse = JSON.parse(data)
        dataParse.forEach(element => {
           let query = `insert into Contacts(name,company,phone_number,email) Values("${element.name}","${element.company}","${element.phone_number}","${element.email}");`
            db.serialize(function(){
                db.run(query,function(err){
                    if(err)throw err
                })
            })
        });
        // console.log(typeof element.phone_number)  
    }

    static group(){
        let data = fs.readFileSync('dataDummy.csv','utf8')
        let dataGroup = data.split('\n')
        // console.log(data.length)
        for(let i=1 ; i<dataGroup.length -1; i++){
            let query = `insert into Groups(groupName) Values("${dataGroup[i]}");`
            db.serialize(function(){
                db.run(query,function(err){
                    if(err)throw err
                })
            })
        }
        // console.log(dataGroup);
    }
}

Seed.contact();
Seed.group()

