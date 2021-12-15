const bcrypt = require('bcrypt');

function hashPassword(plainPassword, done){
    bcrypt.hash(plainPassword, 10, done);
}

function hashPasswordSync (plainPassword){
    return bcrypt.hashSync(plainPassword, 10);
}

function comparePassword(plainPassword, cryptPassword, done){
    bcrypt.compare(plainPassword, cryptPassword, done);
}

exports.hashPassword = hashPassword;
exports.hashPasswordSync = hashPasswordSync;
exports.comparePassword = comparePassword;
