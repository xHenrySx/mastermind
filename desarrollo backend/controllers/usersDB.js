const uuid = require('uuid');
const team = require('./teamsDB')
const crypto = require('../tools/crypto.js');

const userDatabase= {};

function getUserFromUsername (userName){
    for (let user in userDatabase){
        if (userName == userDatabase[user].userName){
            return user;
        }
    }
    return "Unregistered user"
}

function registerUser(user){
    let hashedPwd = crypto.hashPasswordSync(user.password);
    id = uuid.v4()
    userDatabase[id] = {
        userName: user.userName,
        password: hashedPwd
    }
    team.createTeam(id);
};

function checkUserCredentials(userName, password, done){
    let user = userDatabase[getUserFromUsername(userName)];
    if(user){
        crypto.comparePassword(password, user.password, done); // (submitedPassword, hashedPasswordFromDB, done);
    } else {
        done("Missing user");
    }
}

function deleteUser(userName, password, done){
    if (checkUserCredentials(userName, password)){
    let user = userDatabase[getUserFromUsername(userName)];
        userDatabase.delete(user);
        done("succesfull");
    } else {
        done("Cannot find user or access denied")
    }
}

exports.checkUserCredentials = checkUserCredentials;
exports.registerUser = registerUser;
exports.deleteUSer = deleteUser;
exports.getUserFromUsername = getUserFromUsername;
