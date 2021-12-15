const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: "es un secreto" // TODO deberia crear en un variable de entorno
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log("Jwt: ", decoded);
        return done(null, decoded);
    }));
}

