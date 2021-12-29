// modulos de express
const express = require('express');
const app = express();
const port = 3000;

// passport 
const passport = require('passport');
require('./tools/auth_Jwt.js')(passport); 
app.use(passport.initialize());

// convertir el body en objeto json
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routAuth = require('./routers/auth').router // acciones de autenticacion como el logeo
app.use('/auth', routAuth)

const routTeams = require('./routers/teams').router // acciones sobre /team (equipo pokemon);
app.use('/teams', routTeams);

const routeUsers = require('./routers/users').router // acciones sobre /team (equipo pokemon);
app.use('/users', routeUsers);


// iniciar el servidor 
const colors = require('colors') // paquete para cambiar el estilo y el color de texto del console.log() XD
app.listen(port, () => {
    console.log('Server started in port 3000'.blue.italic.bold)
})

exports.app = app;
