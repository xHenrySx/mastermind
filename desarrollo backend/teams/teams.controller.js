const userController = require('../users/users.controller');
const axios = require('axios');
const pokeapi = 'https://pokeapi.co/api/v2/pokemon/';
const { to } = require('../tools/to')

const mongoose = require('mongoose');
const TeamModel = mongoose.model('teamModel', {
    userId: String,
    team: []
});


function teamTemplate (id){  // crear un equipo de usuario por defecto
    return new Promise(async (resolve, reject) => {
        let newTeam = new TeamModel({userId: id, team: ['bulbasaur', 'pikachu']})
        await newTeam.save()
        resolve();
    })
}

function getTeam (userName){
    user = userController.getUserFromUsername(userName);
    if (user != undefined) {
        return teamsDatabase[user];
    }
    return "El usuario no existe";
}

function deleteTeam (id){
    return new Promise((resolve, reject) => {
        TeamModel.deleteOne({userId: id});
        resolve()
    });
}

async function addPokemon (userName, pokemon){
    let [err, user] = await userController.getUserFromUsername(userName);
    let userId = user.userId;
    let team = await TeamModel.findOne({userId: userId});

    return new Promise(resolve => {
        if (team.team.length > 5){
            resolve(false);
        }

        getPokemonFromApi(pokemon).then(async (response)=> {
            if (!response){
                return resolve(false);
            }
            team.team.push({name: response.data.name, type: response.data.type});
            await team.save();
            resolve(true);
        });
    });
}


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
