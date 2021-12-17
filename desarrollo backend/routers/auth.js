const router = require('express').Router();
const jwt = require('jsonwebtoken');

const userControllers = require('../controllers/usersDB');
userControllers.registerUser({userName: "elias", password: "1234"})

// ruta de las llamadas a '/'
router.route('/')
    .get((req, res) => {
        res.send("implementacion de un get");
    })
    .post((req, res) => {
        res.send("implementacion de un post");
    })

// ruta de las llamadas a '/login'
router.route('/login')
    .post((req, res) => {
        if (!req.body){
            return res.status(400).json({message: "Missing data"});
        } else if (!req.body.user || !req.body.password){
            return res.status(400).json({message: "Missing data"});
        }

        userControllers.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
            if (err || !result){
                return res.status(401).json({message: "Invalid credentials"});
            }
            const token = jwt.sign({userId: req.body.user}, "es un secreto");
            res.status(200).json({token: token});
        });
    })

exports.router = router;
