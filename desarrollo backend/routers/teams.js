const router = require('express').Router();
const teamController = require('../controllers/teamsDB');

// modulos de autenticacion de la llamada
const passport = require('passport');

// acciones sobre el team completo
router.route('/') 
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => {    // consultar equipo
        res.status(200).json(
            { 
                team: teamController.getTeam(req.user.userId), 
                trainer: req.user.userId,
                message: "Actual pokemon team"
            });
    })

    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => {  // modificar el equipo entero
        if (teamController.changePokemonTeam( req.user.userId, req.body.team)){
            res.status(200).send();
        } else {
            res.status(400).json({message: "The given list is too big..."})
        }
    })


// acciones sobre los pokemon indivuduales
router.route('/pokemons')
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => {  // agregar nuevo pokemon
        if (teamController.addPokemon( req.user.userId, req.body.pokemon) ){
            res.status(200).send();
        } else {
            res.status(400).json({message: "Your team is already full..."})
        }
    })

    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => {  // agregar pokemon
        if (teamController.deletePokemon(req.user.userId, req.body.pokemonPosition)){
            res.status(200).send();
        } else {
            res.status(400).json({message: "Your team is already empty..."})
        }
    })

exports.router = router;
