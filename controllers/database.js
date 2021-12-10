const uuid = require('uuid');
const crypto = require('../crypto.js');

const userDataBase = {};

function registerUser(userName, password){
    // guardar nuevo usuario en la base de datos
    crypto.hashPassword(password, (err, result) => {
        userDataBase[uuid.v4()] = {
            userName: userName,
            password: result
        };
    });
}

function checkUserCredentials(userId, password, done){
    // comprobar que las credenciales sean correctas
    let user = userDataBase[userId];
    crypto.comparePassword(password, user.password, done)
}

