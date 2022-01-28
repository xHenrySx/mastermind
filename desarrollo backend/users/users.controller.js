const uuid = require('uuid');
const team = require('../teams/teams.controller')
const crypto = require('../tools/crypto.js');
const { to } = require('../tools/to');

const mongoose = require('mongoose');
const UserModel = mongoose.model('UserModel', 
    {
        userName: String, 
        userId: String, 
        password: String
    });

function getUserFromUsername (userName){
    return new Promise (async(resolve, reject) => {
        let [err, result] = await to( UserModel.findOne({ userName: userName }).exec() );
        if (err) {
            return reject(err);
        } 
        return resolve(result);
    });
}

function getUser (userId) {
    return new Promise(async(resolve, reject) => {
        let [err, result] = await to(UserModel.findOne({ userId: userId }).exec());
        if (err) {
            return reject(err);
        } 
        return resolve(result);
    });
}

// registrar usuario y asignar equipo por defecto 
function registerUser(userName, password){
    return new Promise(async (resolve, reject) => {
        let hashedPwd = crypto.hashPasswordSync(password);
        id = uuid.v4()
        // Guardar en la base de datos nuestro usuario
        let newUser = new UserModel ({
            userName: userName,
            userId: userId,
            password: hashedPwd
        });
        await newUser.save();
        await team.teamTemplate(userId);
        resolve();
    });
};

async function checkUserCredentials(userName, password){
    let [err, user] = await to(getUserFromUsername(userName));
    if(!err){
        crypto.comparePassword(password, user.password); // (submitedPassword, hashedPasswordFromDB, done);
        return [null, user];
        // done returns the new user again, like a middleware
    } else {
        return [err, null];
    }
}

async function deleteUser(userName){
    let [err, user] = await to(getUserFromUsername(userName));
    let userId = user.userId;
    return new Promise(async(resolve, reject) => {
        if (err || !user){
            return reject(err);
        }
        await to(UserModel.deleteOne({userId: userId}));
        await to(team.deleteTeam(userId));
        resolve("Succesfull");
    });
}

//----------------------------------------------------------
async function cleanUp(){
    await UserModel.deleteMany({})
    await team.cleanUp();
}

exports.checkUserCredentials = checkUserCredentials;
exports.registerUser = registerUser;
exports.deleteUSer = deleteUser;
exports.cleanUp = cleanUp;
exports.getUserFromUsername = getUserFromUsername;
exports.getUser = getUser;
