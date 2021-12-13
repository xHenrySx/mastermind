const bcrypt = require('bcrypt');

// encriptar la contrasena de manera asincrona
function hashPassword(plainPwd, done){
    bcrypt.hash(plainPwd, 10, done); // (contrasena, iteraciones de cifrado, done)
}

// encriptar la contrasena de manera sincrona (solo para testear)
function hashPasswordSync(plainPwd, done){
    bcrypt.hashSync(plainPwd, 10, done); // (contrasena, iteraciones de cifrado, done)
}

// comparar las contrasenas enviadas por el usuario
function comparePassword(plainPwd, hashPwd, done){
    bcrypt.compare(plainPwd, hashPwd, done);
}

exports.hashPassword = hashPassword
exports.hashPasswordSync = hashPasswordSync
exports.comparePassword = comparePassword
