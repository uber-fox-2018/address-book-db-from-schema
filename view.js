class Contacts{
    static display(result){
        if(result==="error" || result===undefined){
            console.log("No duplicate! email must be unique");
        }else{
            console.log("Data has been saved successfully. Total data : ", result);
        }
    }

    static create(result){
        if(result === "error"){
            console.log("No duplicate! email must be unique");
        }else{
            console.log("Data has been saved successfully. Total data : ", result);
        }
    }

    static id(result){
        if(result === "error"){
            console.log("error!");
        }else{
            console.log(result);
        }
    }

    static update(result){
        if(result===0){
            console.log("no changes")
        }else{
            console.log("successfully updated")
        }
    }
}

class Groups{
    static display(result){
        if(result==="error" || result===undefined){
            console.log("No duplicate! group name must be unique");
        }else{
            console.log("Data has been saved successfully. Total data : ", result);
        }
    }

    static create(result){
        if(result === "error"){
            console.log("No duplicate! group name must be unique");
        }else{
            console.log("Data has been saved successfully. Total data : ", result);
        }
    }

    static id(result){
        if(result === "error"){
            console.log("error!");
        }else{
            console.log(result);
        }
    }

    static update(result){
        if(result===0){
            console.log("no changes")
        }else{
            console.log("successfully updated")
        }
    }
}

class ContactGroups{
    static display(result){
        if(result==="error" || result===undefined){
            console.log("Fail!");
        }else{
            console.log("Data has been saved successfully. Total data : ", result);
        }
    }

    static create(result){
        if(result === "error"){
            console.log("Fail!");
        }else{
            console.log("Data has been saved successfully. Total data : ", result);
        }
    }

    static id(result){
        if(result === "error"){
            console.log("error!");
        }else{
            console.log(result);
        }
    }

    static update(result){
        if(result===0){
            console.log("no changes")
        }else{
            console.log("successfully updated")
        }
    }
}

module.exports = {
    Contacts : Contacts,
    Groups : Groups,
    ContactGroups : ContactGroups
};
