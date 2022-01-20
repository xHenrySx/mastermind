const teamController = require('./teams.controller.js');

// retornar el team del usuario
function getTeamForUser (req, res) {
    res.status(200).json({ 
        team: teamController.getTeam(req.user.userId), 
        trainer: req.user.userId,
        message: "Actual pokemon team"
    });
}

// agregar funcion de add pokemon
function addPokemon(req, res) {
    teamController.addPokemon(req.user.userId, req.body.pokemon).then(response => {
        if (response){
            res.status(200).json('pokemon added succesfully');
        } else {
            res.status(400).json('pokemon does not exist');
        }
    });
}

function deletePokemon (req, res) {
    let response = teamController.deletePokemon(req.user.userId, req.body.pokemonPosition);
    if (response) {
        res.status(200).json('Succesfully');
    } else {
        res.status(400).json('Team already empty or invalid index');
    }
}

exports.addPokemon = addPokemon;
exports.deletePokemon = deletePokemon;
exports.getTeamForUser = getTeamForUser;

