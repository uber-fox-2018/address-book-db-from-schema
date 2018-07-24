class View{
    static command(param){
        console.log(`node main.js ${param}`);
    }
    static added(command,name){
        console.log(`${command} ${name} successfully created`);
    }
}

module.exports = View