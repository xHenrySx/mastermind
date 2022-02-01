const jwt = require('jsonwebtoken');
const userController = require('./users.controller');

<<<<<<< HEAD
async function registerUser (req, res) {
    // validamos que los que esten todos los datos necesarios
=======
async function createUser (req, res) {
>>>>>>> 392c301d7cf1955a5d5151839bdf18269bb81178
    if (!req.body.userName || !req.body.password){
        return res.status(400).json({message: 'Missing data'})
    }

<<<<<<< HEAD
    // registramos el usuario
    let response = await userController.registerUser(req.body.userName, req.user.password);
        if (response){
            return res.status(200).json({message: 'user succesfully created'});
        }
        res.status(400).json({message: 'User already exists'});
=======
    if (userController.registerUser(req.body.userName, req.user.password)){
        return res.status(200).json({message: 'user succesfully created'});
    };
    res.status(400).json({message: 'User already exists'});
>>>>>>> 392c301d7cf1955a5d5151839bdf18269bb81178
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

exports.registerUser = registerUser; 
exports.login = login; 
