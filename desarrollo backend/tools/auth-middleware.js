const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

function init (app) {
    app.use(passport.initialize());
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: "es un secreto" // TODO deberia crear en un variable de entorno
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        return done(null, decoded);
    }));
}

const protectWithJwt = (req, res, next) => {
    if (req.originalUrl == '/users/' || req.originalUrl == '/auth/login'){
        return next();
    }
    return passport.authenticate('jwt', {session: false})(req, res, next);
}

exports.init = init;
exports.protectWithJwt = protectWithJwt;
