const userController = require('./usersDB');
const teamsDatabase = {};

function getTeam (userName){
    user = userController.getUserFromUsername(userName);
    return teamsDatabase[user];
}

function createTeam (id){  // crear un equipo de usuario por defecto
    teamsDatabase[id] = ['bulbasur', 'pikachu'];
}

function addPokemon (userId, pokemon){
    team = teamsDatabase[userId]
    if (team.length < 6){
        team.push({ name: pokemon })
    };
}

exports.createTeam = createTeam; 
exports.addPokemon = addPokemon; 
exports.getTeam = getTeam; 
