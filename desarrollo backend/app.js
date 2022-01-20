// modulos de express
const express = require('express');
const app = express();
const port = 3000;

const middlewares = require('./middlewares')
middlewares.setupMiddlewares(app)


const routTeams = require('./teams/teams.router').router // acciones sobre /team (equipo pokemon);
app.use('/teams', routTeams);

const routeUsers = require('./users/users.router').router // acciones sobre /team (equipo pokemon);
app.use('/users', routeUsers);

// iniciar el servidor 
const colors = require('colors') // paquete para cambiar el estilo y el color de texto del console.log() XD
app.listen(port, () => {
    console.log('Server started in port 3000'.rainbow.italic.bold)
})

exports.app = app;
