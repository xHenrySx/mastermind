const jwt = require('jsonwebtoken');
const userController = require('./users.controller');

function createUser (req, res) {
    if (userController.registerUser(req.body)){
        return res.status(200).json({message: 'user succesfully created'});
    };
    res.status(400).josn({message: 'username already exists'});
} 

function login (req, res) {
    if (!req.body){
        return res.status(400).json({message: "Missing data"});
    } else if (!req.body.user || !req.body.password){
        return res.status(400).json({message: "Missing data"});
    }

    userController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        if (result){
            const token = jwt.sign({userId: req.body.user}, "es un secreto");
            return res.status(200).json({token: token});
        }
        res.status(401).json({message: "Invalid credentials"});
    });
}

exports.createUser = createUser; 
exports.login = login; 
