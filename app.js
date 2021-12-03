const express = require('express');
const passport = require('passport');

require('./auten')(passport);
const app = express();
const port = 3000;

app.post('/login', (req, res) => {
    res.status(200).json(
        {token: 'token test'}
    )
});

app.get('/', (req, res) =>{
    // req: request => peticion 
    // res: response => respuesta 
    res.send('Hello world');
})


//agregar nuevos pokemones a la lista
app.post('/team/pokemons', () => {

})

//eliminar pokemones de la lista
app.delete('/team/pokemons/:pokeid', () =>{

})

//consultar nuestro equipo de pokemons
app.get('/team',passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.send('Hello world');
})

//cambiar el orden de nuestros pokemons
app.put('/team', () => {

})


// iniciar el servidor local
app.listen(port, () => {
    console.log('Server started on port', port);
});

exports.app = app;
