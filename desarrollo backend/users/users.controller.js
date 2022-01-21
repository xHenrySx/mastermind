const uuid = require('uuid');
const team = require('../teams/teams.controller')
const crypto = require('../tools/crypto.js');
const { to } = require('../tools/to');

const mongoose = require('mongoose');
const UserModel = mongoose.model('UserModel', {userName: String, userId: String, password: String})

async function getUserFromUsername (userName){
    return new Promise ((resolve, reject) => {
        let [err, result] = await to( UserModel.findOne({ userName: userName }) );
        if (err) {
            return reject(err);
        } 
        return resolve(result);
    });
}

async function getUser (userId) {
    return new Promise((resolve, reject) => {
        let [err, result] = await to(UserModel.findOne({ userId: userId }));
        if (err) {
            return reject(err);
        } 
        return resolve(result);
    });
}

//----------------------------------------------------------
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
        done();
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

function cleanUpUsers(){
    usersDatabase = {};
    team.cleanUp();
}

exports.checkUserCredentials = checkUserCredentials;
exports.registerUser = registerUser;
exports.deleteUSer = deleteUser;
exports.cleanUp = cleanUp;
exports.getUserFromUsername = getUserFromUsername;
