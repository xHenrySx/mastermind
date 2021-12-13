const uuid = require('uuid');
const crypto = require('../crypto.js');

const userDataBase = {};

// registrar nuevo usuario
function registerUser(userNa, password){
    // guardar nuevo usuario en la base de datos
    crypto.hashPasswordSync(password, (err, result) => {
        userDataBase[uuid.v4()] = {
            userName: userNa,
            password: result
        };
    });
}

// encontrar el usuario en la base de datos
function getUserIdFromUserName(userNa){
    for (let user in userDataBase){
        if (userDataBase[user].userName == userNa)
            return userDataBase[user];
    };
}

// login de la cuenta
function checkUserCredentials(userId, password, done){
    // comprobar que las credenciales sean correctas
    let user = getUserIdFromUserName(userId);
    if (user){
        console.log(user);
        crypto.comparePassword(password, user.password, done);
    } else {
        done('Missing user');
    }
}

exports.checkUserCredentials = checkUserCredentials;
exports.registerUser = registerUser;
