const router = require('express').Router();
const teamController = require('../teams/teams.controller');

// modulos de autenticacion de la llamada
const passport = require('passport');
//const { status } = require('express/lib/response');
const pokeapi = 'https://pokeapi.co/api/v2/pokemon/'

// acciones sobre el team completo
router.route('/') 
    .get((req, res, next) => {    // consultar equipo
        res.status(200).json(
            { 
                team: teamController.getTeam(req.user.userId), 
                trainer: req.user.userId,
                message: "Actual pokemon team"
            });
    });


// acciones sobre los pokemon individuales
router.route('/pokemons')

    .post((req, res, next) => {  // agregar nuevo pokemon
            teamController.addPokemon(req.user.userId, req.body.pokemon).then(response => {
                if (response){
                    res.status(200).json('pokemon added succesfully');
                } else {
                    res.status(400).json('pokemon does not exist');
                }
            });
    })

    .delete((req, res, next) => {  // eliminar pokemon
        if (teamController.deletePokemon(req.user.userId, req.body.pokemonPosition)){
            res.status(200).json({ userId: req.user.userId });
        } else {
            res.status(400).json({message: "Your team is already empty..."})
        }
    })

exports.router = router;
