const router = require('express').Router();
const userController = require('../users/users.controller');

// acciones de creacion de usuarios
router.route('/') 
    .post((req, res, next) => {    // crear un usuario nuevo
        userController.registerUser(req.body);
        res.status(200).json();
    })

exports.router = router;
