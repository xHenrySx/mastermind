const express = require('express');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport');
const userControllers = require('./controllers/database')

require('./autentication')(passport);
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(passport.initialize());

// metodo para iniciar sesion en la api
app.post('/login', (req, res) => {
    // comprobar las credenciales
    userControllers.checkUserCredentials(req.body.user, req.body.password, (err, result) =>{
        if (!result){
            res.status(401).json({message: "Ivalid credentials"});
        }
        const token = jwt.sign({userId: req.body.user})
        res.status(200).json({ token: token });
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
app.put('/team', () => {

});


// iniciar el servidor local
app.listen(port, () => {
    console.log('Server started on port', port);
});

exports.app = app;
