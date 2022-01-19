const userController = require('../users/users.controller');
const axios = require('axios');
const pokeapi = 'https://pokeapi.co/api/v2/pokemon/';

var teamsDatabase = {};

function getTeam (userName){
    user = userController.getUserFromUsername(userName);
    if (user != undefined) {
        return teamsDatabase[user];
    }
    return "El usuario no existe";
}

function createTeam (id){  // crear un equipo de usuario por defecto
    teamsDatabase[id] = ['bulbasur', 'pikachu'];
}

function deleteTeam (id){
    teamsDatabase[id] = {};
}

async function addPokemon (userName, pokemon){
    let userId = userController.getUserFromUsername(userName);
    let team = teamsDatabase[userId];

    return new Promise(resolve => {
        if (team.length > 5){
            resolve(false);
        }

        getPokemonFromApi(pokemon).then((response)=> {
            if (!response){
                return resolve(false);
            }
            team.push({name: response.data.name, type: response.data.type});
            resolve(true);
        });
    });
}


function deletePokemon (userName, position){
    userId = userController.getUserFromUsername(userName);
    team = teamsDatabase[userId];
    if (team.length > 0 && team[position] != undefined){
        team.splice(position, 1);
        return true;
    }
    return false;
}

async function getPokemonFromApi (pokemon){
    return new Promise(async (resolve, reject) => {
        axios
            .get(pokeapi + pokemon).then(response => {
                resolve(response) 
            })
            .catch(err => {
                resolve(false)
            })
    });
}

// limpiar la base de datos de equipos
function cleanUp () {
    teamsDB = {}
}

exports.teamsDatabase = teamsDatabase; 
exports.createTeam = createTeam; 
exports.deletePokemon = deletePokemon; 
exports.addPokemon = addPokemon; 
exports.getTeam = getTeam; 
exports.deleteTeam = deleteTeam; 
exports.cleanUp = cleanUp; 
