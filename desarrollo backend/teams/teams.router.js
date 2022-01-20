const router = require('express').Router();
const teamController = require('./teams.controller');
const teamHttp = require('./teams.http');

// acciones sobre el team completo
router.route('/') 
    .get(teamHttp.getTeamForUser);

// acciones sobre los pokemon individuales
router.route('/pokemons')
    .post(teamHttp.addPokemon)
    .delete(teamHttp.deletePokemon)

exports.router = router;

