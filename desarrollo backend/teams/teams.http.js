const teamController = require('./teams.controller.js');

// agregar funcion de add pokemon
function addPokemon(req, res){
    teamController.addPokemon(req.user.userId, req.body.pokemon).then(response => {
        if (response){
            res.status(200).json('pokemon added succesfully');
        } else {
            res.status(400).json('pokemon does not exist');
        }
    });
}
exports.addPokemon = addPokemon;
// agregar funcion de delete pokemon
//

