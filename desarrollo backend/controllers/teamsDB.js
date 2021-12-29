const userController = require('./usersDB');
var teamsDatabase = {};
const axios = require('axios');
const pokeapi = 'https://pokeapi.co/api/v2/pokemon/'

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

function deleteTeam (id){
    teamsDatabase[id] = {}
}

function addPokemon (userName, pokemon){
    userId = userController.getUserFromUsername(userName);
    if (teamsDatabase[userId].length < 6){
        teamsDatabase[userId].push({name: pokemon.name, type: pokemon.type})
        return true
    }
    return false
}

function deletePokemon (userName, position){
    userId = userController.getUserFromUsername(userName);
    team = teamsDatabase[userId];
    if (team.length > 0){
        team.splice(position, 1);
        return true;
    }
    return false;
}

function changePokemonTeam (userName, team){
    if ( team.length > 6){
        return false
    }

    user = userController.getUserFromUsername(userName);
    let newTeam = [];
    team.forEach(element => {
        axios.get(pokeapi + element).then((response) => {
            if (response == null || response == undefined) {
                return false
            }        
            newTeam.push({pokemon: response.name, type: response.type});
        }).then(()=> {
            teamsDatabase[user] = newTeam;
        });
    })
    return true;
}

function cleanUp () {
    teamsDB = {}
}

exports.createTeam = createTeam; 
exports.deletePokemon = deletePokemon; 
exports.addPokemon = addPokemon; 
exports.getTeam = getTeam; 
exports.deleteTeam = deleteTeam; 
exports.cleanUp = cleanUp; 
exports.changePokemonTeam = changePokemonTeam; 
