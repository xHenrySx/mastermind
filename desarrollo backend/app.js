const port = 3000;

const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport');

// usuario por defecto para los tests
const userControllers = require('./controllers/database');
userControllers.registerUser('elias', '0000');

// metodo de autenticacion del jwt
require('./autentication')(passport);
const app = express();

app.use(bodyParser.json())
app.use(passport.initialize());

// metodo para iniciar sesion en la api
app.post('/login', (req, res) => {
    //req => require, peticion
    //res => response, respuesta

    // comprobar si no falta ningun dato
    if (!req.body){
        return res.status(400).json({message: 'Missing data'})
    } else if (!req.body.user || !req.body.password){
        return res.status(400).json({message: 'Missing data'})
    }
console.log(req.body.user, req.body.password);
    //comenzar el login
    userControllers.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        // comprobar usuario y contrasena, si no son validas error
        if (!result || err){
            return res.status(401).json({message: 'Invalid credential'})
        }

        const token = jwt.sign({userid: result}, 'una contrasena muy secreta'); // TODO, no dejar ahi el token obvio 
        res.status(200).json(
            {token: token}
        )
    })
});


//agregar nuevos pokemones a la lista
app.post('/team/pokemons', () => {

})


//eliminar pokemones de la lista
app.delete('/team/pokemons/:pokeid', () =>{

})


//consultar nuestro equipo de pokemons
app.get('/team',passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.status(200).send("chau mundo");
});

//cambiar el orden de nuestros pokemons
app.post('/team', (req, res) => {
    res.status(401)
});


// iniciar el servidor local
app.listen(port, () => {
    console.log('Server started on port', port);
});

exports.app = app;
