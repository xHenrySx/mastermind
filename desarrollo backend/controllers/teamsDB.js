const userController = require('./usersDB');
const teamsDatabase = {};

function getTeam (userName){
    user = userController.getUserFromUsername(userName);
    if (user != undefined) {
        return teamsDatabase[user];
    }
    return "El usuario no existe"
}

function createTeam (id){  // crear un equipo de usuario por defecto
    teamsDatabase[id] = ['bulbasur', 'pikachu'];
}

function addPokemon (userName, pokemon){
    userId = userController.getUserFromUsername(userName);
    team = teamsDatabase[userId];
    if (team.length < 6){
        team.push(pokemon)
        return true;
    } else {
        return false;
    }
}

function deletePokemon (userName, position){
    userId = userController.getUserFromUsername(userName);
    team = teamsDatabase[userId];
    if (team.length > 0){
        team.splice(position, 1);
        return true;
    } else {
        return false;
    };
}

function changePokemonTeam (userName, team){
    if (team.length <= 6){
        user = userController.getUserFromUsername(userName);
        teamsDatabase[user] = team;
        return true;
    }
}

exports.createTeam = createTeam; 
exports.deletePokemon = deletePokemon; 
exports.addPokemon = addPokemon; 
exports.getTeam = getTeam; 
exports.changePokemonTeam = changePokemonTeam; 
