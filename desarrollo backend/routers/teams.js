const router = require('express').Router();
const teamController = require('../controllers/teamsDB');

// modulos de autenticacion de la llamada
const passport = require('passport');

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => {
        res.status(200).json({ team: teamController.getTeam(req.user.userId), trainer: req.user.userId });
    });

exports.router = router;
