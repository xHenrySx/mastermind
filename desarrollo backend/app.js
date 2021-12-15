// modulos de express
const express = require('express');
const app = express();
const port = 3000;

// convertir el body en objeto json
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// modulos de autenticacion de la llamada
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('./tools/auth_Jwt')(passport); // le passamos los parametros de auth a la variable passport para despues usar de middelware en /team

const userDatabase = require('./dataBase/dataBase.js');
userDatabase.registerUser({userName: "elias", password: "1234"});


// funcion de logeo de usuario
app.post("/login", (req, res) => {
    if (!req.body){
        return res.status(400).json({message: "Missing data"});
    } else if (!req.body.user || !req.body.password){
        return res.status(400).json({message: "Missing data"});
    }

    userDatabase.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        if (err || !result){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({userId: result}, "un secreto");
        res.status(200),json({token: token});
    });
});


// funcion de preguntar equipo
app.get("/team", passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).send("put que le pario")
});


// iniciar el servidor 
app.listen(port, () => {
    console.log('Server started in port 3000')
})

exports.app = app;
