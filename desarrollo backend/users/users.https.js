const jwt = require('jsonwebtoken');
const userController = require('./users.controller');

async function createUser (req, res) {
    if (!req.body.userName || !req.body.password){
        return res.status(400).json({message: 'Missing data'})
    }

    if (userController.registerUser(req.body.userName, req.user.password)){
        return res.status(200).json({message: 'user succesfully created'});
    };
    res.status(400).json({message: 'User already exists'});
} 

async function login (req, res) {
    // comprobamos que los datos esten completos
    if (!req.body){
        return res.status(400).json({message: "Missing data"});
    } else if (!req.body.user || !req.body.password){
        return res.status(400).json({message: "Missing data"});
    }

    // comprobamos credenciales del usuario
    userController.checkUserCredentials(req.body.user, req.body.password).then((err, result) => {
        if (err || !result){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({userId: result.userId}, "es un secreto");
        res.status(200).json({token: token});
    });
}

exports.createUser = createUser; 
exports.login = login; 
