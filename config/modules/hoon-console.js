/*
    name: hoon-console
    author: Hoon-Dev
    date: 21.04.24

    desc: Hoonplate prefixed console logger
*/

module.exports = {
    hoonsole: {
        title(){
            console.log("\x1b[47m\x1b[30m\x1b[2m[ Hooneplate@STW ]\x1b[0m "+
                        "Hoonplate@STW \x1b[32mversion 1.0.0\n");
        },
        log(message){
            console.log("\x1b[47m\x1b[30m\x1b[2m[ Hooneplate@STW ]\x1b[0m > "+message);
        },
        error(message){
            console.log("\x1b[41m\x1b[37m\x1b[2m[ Hooneplate@STW ]\x1b[0m > "+message);
        }
    }
}