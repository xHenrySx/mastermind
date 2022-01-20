const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);

const userControllers = require('../users/users.controller'); 
const teamsDB = require('../teams/teams.controller'); 

const app = require('../app.js').app;
const passport = require('passport');


describe('Suite de test de la base de datos de equipos', function () {
    
    // configuraciones generales del test
    this.beforeEach(() => {
        // crear un usuario de pruebas 
        userControllers.registerUser({userName: "elias", password: "1234"});
        userControllers.registerUser({userName: "marcos", password: "1234"});
    });

    this.afterEach(function (){userControllers.cleanUp()});
    this.timeout(9000);


    // agregar un nuevo pokemon
    it('Add new pokemon', (done) => {
        chai.request(app)
            .get('/users/')
            .set('content-type', 'application/json')
            .send({ user: "marcos", password: "1234" })
            .end((err, res) => {
                let token = res.body.token;
                chai.request(app)
                    .post("/teams/pokemons")
                    .set('Authorization', `JWT ${token}`)
                    .send({pokemon: 'charizard'})
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        chai.request(app)
                            .get("/teams/")
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 200, 'login succesfull');
                                chai.assert.equal(res.body.trainer, 'marcos');
                                chai.assert.equal(res.body.team[0], 'bulbasur');
                                chai.assert.equal(res.body.team[1], 'pikachu');
                                chai.assert.equal(res.body.team[2].name, 'charizard');
                                done();
                            });
                    });
            });
    });

    // when the team is full
    it('should return 400 when the team is full', (done) => { 
        
        let us = userControllers.getUserFromUsername("marcos");

        [{name: 'charmander', type: 'elios'},{name: 'charmander', type: 'elios'},{name: 'charmander', type: 'elios'}].forEach(element => {
            teamsDB.teamsDatabase[us].push(element);
        })

        chai.request(app)
            .get('/users/')
            .set('content-type', 'application/json')
            .send({ user: "marcos", password: "1234" })
            .end((err, res) => { 
                chai.request(app)
                .post('/teams/pokemons')
                .set('Authorization', `JWT ${res.body.token}`)
                .send({pokemon: 'bulbasur'})
                .end((err, res) => {
                    chai.assert.equal(res.statusCode, 400);
                    done();
                });
            });
    });

    // elminar un pokemon del equipo
    it('Delete pokemon in the position', (done) => {
        chai.request(app)
            .get('/users/')
            .set('content-type', 'application/json')
            .send({ user: "marcos", password: "1234" })
            .end((err, res) => {
                let token = res.body.token
                chai.request(app)
                    .delete("/teams/pokemons")
                    .set('Authorization', `JWT ${token}`)
                    .send({pokemonPosition: 1})
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        chai.request(app)
                            .get("/teams/")
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'marcos');
                                chai.assert.equal(res.body.team[0], 'bulbasur');
                                chai.assert.equal(res.body.team[1], undefined);
                                done();
                            })
                    });
            });
    });


    // -- Errors -- 
    it('Should return 400 when the pokemon does not exist', (done) => {
        chai.request(app) 
            .get('/users/')
            .set('content-type', 'application/json')
            .send({user: 'elias', password: '1234'})
            .end((err, res) => {
                chai.request(app)
                    .post('/teams/pokemons')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .send({pokemon: 'potero' })
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 400);
                        done();
                    });
            });
    });

    it('should return 400 when the pokemon index is invalid', (done) => {
        chai.request(app)
            .get('/users/')
            .set('content-type', 'application/json')
            .send({user: 'elias', password: '1234'})
            .end((err, res) => {
                chai.request(app)
                .delete('/teams/pokemons')
                .set('Authorization', `JWT ${res.body.token}`)
                .send({pokemonPosition: 10})
                .end((err, res) => {
                    chai.assert.equal(res.statusCode, 400);
                    done();
                });
            });
    });
});


