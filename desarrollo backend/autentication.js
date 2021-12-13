// llamar a las funciones de la librerias de passport
const JwtStrategy = require('passport-jwt').Strategy, /* etrategia de la clave de acceso */
    ExtractJwt = require('passport-jwt').ExtractJwt;

// exportar modulos, aca me perdi un poco sinceramente, pero llamas al modulo passport 
module.exports = passport => {
    // crear una constante que recibe los parametros de los header (las contrasenas pues)
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"), /* para extraer los datos del header*/
        secretOrKey: 'algo' // TODO, guardar la contrasena en una variable de entorno
    }
    //usar las instancia de passport 
    passport.use(new JwtStrategy(opts, (decoded, done) => { /* como llamar a passport*/
        console.log('JWT decodificado', decoded);
        return done(null, decoded);
    }));
};
