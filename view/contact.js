class View{

    static add(name){
        console.log(`${name} has been added to contact`)
    }

    static update(){
        console.log(`some data has been updated`);
    }

    static delete(id){
        console.log(`data with id: ${id} has been deleted`)

    }

    static showContact(data){
        console.log(data)
    }

}

module.exports = View