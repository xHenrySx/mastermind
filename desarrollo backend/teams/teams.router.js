const router = require('express').Router();
const teamController = require('./teams.controller');
const teamHttp = require('./teams.http');

// acciones sobre el team completo
router.route('/') 
    .get((req, res) => {    // consultar equipo
        res.status(200).json({ 
            team: teamController.getTeam(req.user.userId), 
            trainer: req.user.userId,
            message: "Actual pokemon team"
        });
    });


// acciones sobre los pokemon individuales
router.route('/pokemons')
    .post(teamHttp.addPokemon)

    .delete((req, res) => {  // eliminar pokemon
        if (teamController.deletePokemon(req.user.userId, req.body.pokemonPosition)){
            res.status(200).json({ userId: req.user.userId });
        } else {
            res.status(400).json({message: "Your team is already empty..."})
        }
    })

exports.router = router;
