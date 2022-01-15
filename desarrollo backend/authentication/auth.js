const router = require('express').Router();
const jwt = require('jsonwebtoken');

const userControllers = require('../users/users.controller');


// ruta de las llamadas a '/login'
router.route('/login')
    .post((req, res) => {
        if (!req.body){
            return res.status(400).json({message: "Missing data"});
        } else if (!req.body.user || !req.body.password){
            return res.status(400).json({message: "Missing data"});
        }

        userControllers.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
            if (result){
                const token = jwt.sign({userId: req.body.user}, "es un secreto");
                return res.status(200).json({token: token});
            }
            res.status(401).json({message: "Invalid credentials"});
        });
    })

exports.router = router;
