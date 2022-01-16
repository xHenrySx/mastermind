const router = require('express').Router();
const userController = require('../users/users.controller');

// acciones de creacion de usuarios
router.route('/') 
    .post((req, res) => {    // crear un usuario nuevo
        if (userController.registerUser(req.body)){
            return res.status(200).json();
        };
        res.status(400).josn({message: 'username already exists'});
    })

exports.router = router;
