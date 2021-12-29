const uuid = require('uuid');
const team = require('./teamsDB')
const crypto = require('../tools/crypto.js');

var usersDatabase= {};

function getUserFromUsername (userName){
    for (let user in usersDatabase){
        if (userName == usersDatabase[user].userName){
            return user;
        }
    }
    return false
}

// crear un usuario con un equipo por defecto
function registerUser(user){
    if (! getUserFromUsername(user.userName)){
        let hashedPwd = crypto.hashPasswordSync(user.password);
        id = uuid.v4()
        usersDatabase[id] = {
            userName: user.userName,
            password: hashedPwd
        }
        team.createTeam(id);
        return true
    }
    return false
};

function checkUserCredentials(userName, password, done){
    let user = usersDatabase[getUserFromUsername(userName)];
    if(user){
        crypto.comparePassword(password, user.password, done); // (submitedPassword, hashedPasswordFromDB, done);
    } else {
        done("Missing user");
    }
}

function deleteUser(userName, password, done){
    id = checkUserCredentials(userName, password)
    if (id){
        let user = usersDatabase[id];
        usersDatabase.delete(user);
        team.deleteTeam(user);
        done("succesfull");
    } else {
        done("Cannot find user or access denied");
    }
}

function cleanUp(){
    usersDatabase = {};
    team.cleanUp();
}

exports.checkUserCredentials = checkUserCredentials;
exports.registerUser = registerUser;
exports.deleteUSer = deleteUser;
exports.cleanUp = cleanUp;
exports.getUserFromUsername = getUserFromUsername;
