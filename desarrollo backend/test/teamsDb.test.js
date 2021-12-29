const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);

const userControllers = require('../controllers/usersDB'); 
const teamControllers = require('../controllers/teamsDB'); 

const app = require('../app.js').app;


describe('Suite de test de la base de datos de equipos', function () {
        // configuraciones generales del test
    this.beforeEach(() => {
        // crear un usuario de pruebas 
        userControllers.registerUser({userName: "elias", password: "1234"});
        userControllers.registerUser({userName: "marcos", password: "1234"});
    });
    this.afterEach(function (){userControllers.cleanUp()});
    this.timeout(4000);

    // modificar el equipo completo
    it('Change the team formation', (done) => {
        chai.request(app)
            .post("/auth/login")
            .set('content-type', 'application/json')
            .send({ user: "elias", password: "1234" })
            .end((err, res) => {
                let token = res.body.token
                chai.request(app)
                    .put("/teams/")
                    .set('Authorization', `JWT ${token}`)
                    .send({team: ['bulbasur', 'porigon', 'mew']})
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        chai.request(app)
                            .get("/teams/")
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'elias');
                                chai.assert.equal(res.body.team[0], 'bulbasur');
                                chai.assert.equal(res.body.team[1], 'porigon');
                                chai.assert.equal(res.body.team[2], 'mew');
                                done();
                            });
                    });
            });
    })

    // agregar un nuevo pokemon
    it('Add new pokemon', (done) => {
        chai.request(app)
            .post("/auth/login")
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

    // elminar un pokemon del equipo
    it('Delete pokemon in the position', (done) => {
        chai.request(app)
            .post("/auth/login")
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
});


