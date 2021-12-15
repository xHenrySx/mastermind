const uuid = require('uuid');
const crypto = require('../tools/crypto.js');

const userDatabase= {};

function getUserIdFromUsername (userName){
    for (let user in userDatabase){
        if (userName == userDatabase[user].userName){
            return userDatabase[user];
        }
    }
}

function registerUser(user){
    let hashedPwd = crypto.hashPasswordSync(user.password);
    userDatabase[uuid.v4()] = {
        userName: user.userName,
        password: hashedPwd
    }
};

function checkUserCredentials(userName, password, done){
    let user = getUserIdFromUsername(userName);
    if(user){
        crypto.comparePassword(password, user.password, done);
    } else {
        done("Missing user");
    }
}

function deleteUser(userId, password){
    return false
}


exports.checkUserCredentials = checkUserCredentials;
exports.registerUser = registerUser;
exports.deleteUSer = deleteUser;
