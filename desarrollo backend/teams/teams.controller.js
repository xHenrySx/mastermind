const userController = require('../users/users.controller');
const axios = require('axios');
const pokeapi = 'https://pokeapi.co/api/v2/pokemon/';
const { to } = require('../tools/to')

const mongoose = require('mongoose');
const teamModel = mongoose.model('teamModel', {
    userId: String,
    team: Array
});


function teamTemplate (id){  // crear un equipo de usuario por defecto
    return new Promise(async (resolve, reject) => {
        let newTeam = new teamModel({userId: id, team: ['bulbasaur', 'pikachu']})
        await newTeam.save(); // guardar en la base de datos
        resolve();
    })
}

// buscar el team del usuario en la base de datos
function getTeam (userName){
    user = userController.getUserFromUsername(userName);
    if (user != undefined) {
        return teamsDatabase[user];
    }
    return "El usuario no existe";
}

// elininar team
function deleteTeam (id){
    return new Promise((resolve, reject) => {
        teamModel.deleteOne({userId: id});
        resolve()
    });
}

// anadir nuevo pokemon al team del usuario
async function addPokemon (userName, pokemon){
    let [err, user] = await userController.getUserFromUsername(userName); // buscar el usuario desde la base de datos
    let userId = user.userId;
    let team = await TeamModel.findOne({userId: userId}); // buscar el team del usuario en la DB

    // insertar el nuevo pokemon dentro del equipo
    return new Promise(resolve => {
        // si el equipo ya esta lleno retornamos false
        if (team.team.length > 5){
            resolve(false);
        }
        // buscamos el pokemon de la pokeapi 
        getPokemonFromApi(pokemon).then(async (response)=> {
            if (!response){
                return resolve(false);
            }
            // agregamos el pokemon con mongose
            team.team.push({name: response.data.name, type: response.data.type});
            await team.save();
            resolve(true);
        });
    });
}


// eliminar pokemon de la base de datos del usuario
async function deletePokemon (userName, position){
    let [err, user] = await userController.getUserFromUsername(userName);
    team = user.team;
    return new Promise(async (resolve, reject) => {
        if (team.length > 0 && team[position] != undefined){
            team.splice(position, 1);
            await user.save();
            return resolve();
        }
        reject();
    });
}

// traer los datos del pokemon desde la poekapi
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
async function cleanUp () {
    await TeamModel.deleteMany({});
    return true
}

exports.teamTemplate = teamTemplate; 
exports.deletePokemon = deletePokemon; 
exports.addPokemon = addPokemon; 
exports.getTeam = getTeam; 
exports.deleteTeam = deleteTeam; 
exports.cleanUp = cleanUp; 
