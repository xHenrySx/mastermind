const router = require('express').Router();
const teamController = require('../controllers/teamsDB');
const axios = require('axios')

// modulos de autenticacion de la llamada
const passport = require('passport');
const pokeapi = 'https://pokeapi.co/api/v2/pokemon/'

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



// acciones sobre los pokemon individuales
router.route('/pokemons')

    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => {  // agregar nuevo pokemon

        axios.get(pokeapi + req.body.pokemon).then((response) => {
            if(teamController.addPokemon(req.user.userId, response.data)){
                res.status(200).json({message: 'Pokemon agregado con exito'})
            } else {
                res.status(401).json({message: 'Pokemon invalido o equipo lleno'})
            }
        })
    })

    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => {  // eliminar pokemon
        if (teamController.deletePokemon(req.user.userId, req.body.pokemonPosition)){
            res.status(200).json({ userId: req.user.userId });
        } else {
            res.status(400).json({message: "Your team is already empty..."})
        }
    })

exports.router = router;
