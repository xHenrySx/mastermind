const router = require('express').Router();
const userController = require('../controllers/usersDB');
//const axios = require('axios')

// modulos de autenticacion de la llamada
//const passport = require('passport');

// acciones de creacion de usuarios
router.route('/') 
    .post((req, res, next) => {    // crear un usuario nuevo
        userController.registerUser(req.body);
        res.status(200).json();
    })

exports.router = router;
