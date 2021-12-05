const bcrypt = require('bcrypt');

function hashPassword(plainPwd, done){
    bcrypt.hash(plainPwd, 10, done); // (contrasena, iteraciones de cifrado, done)
}

function comparePassword(plainPwd, hashPwd, done){
    bcrypt.compare(plainPwd, hashPwd, done);
}
