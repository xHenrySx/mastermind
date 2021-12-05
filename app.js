const express = require('express');
const passport = require('passport');

require('./autentication')(passport);
const app = express();
const port = 3000;

app.use(passport.initialize());

app.post('/login', (req, res) => {
    res.status(200).json(
        {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XnCjUwbv9Xqy8t7w0Y-1zmJ3pEdzteYXPIyoLZKNl8o'}
    )
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
