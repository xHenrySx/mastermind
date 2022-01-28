const router = require('express').Router();
const userHttp = require('./users.https');

// acciones de creacion de usuarios
router.route('/') 
    .post(userHttp.registerUser)
    .get(userHttp.login)

exports.router = router;
