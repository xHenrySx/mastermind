const chai = require('chai')
const chaihttp = require('chai-http')
chai.use(chaihttp)

const app = require('../app.js').app

describe('Suite de test del backend de la pokeapi', () =>{

    // cunado las credenciales estan vacias
    it('If no data is provided in user credentials', (done) => {
        chai.request(app)
            .post("/auth/login")
            .end((err, resul) =>{
                chai.assert.equal(resul.statusCode, 400, "no data provided");
                done();
            });
    });

    // validar credenciales del usuario
    it('Validation of user credentials', (done) => {
        chai.request(app)
            .post("/auth/login")
            .set('content-type', 'application/json')
            .send({ user: "elias", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200, 'valid credentials');
                done();
            });
    });

    // crear un nuevo usuario con nuevo equipo
    it('Create a new team and a new acount for the user', (done) => {
        chai.request(app)
            .post("/auth/login")
            .set('content-type', 'application/json')
            .send({ user: "elias", password: "1234" })
            .end((err, res) => {
                chai.request(app)
                    .get("/teams/")
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200, 'login succesfull')
                        chai.assert.equal(res.body.trainer, 'elias')
                        chai.assert.equal(res.body.team[0], 'bulbasur')
                        chai.assert.equal(res.body.team[1], 'pikachu')
                        done();
                    });
            });
    });

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
                    .put("/teams/pokemons")
                    .set('Authorization', `JWT ${token}`)
                    .send({pokemon: 'charizard'})
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        chai.request(app)
                            .get("/teams/")
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 200, 'login succesfull');
                                chai.assert.equal(res.body.trainer, 'elias');
                                chai.assert.equal(res.body.team[0], 'bulbasur');
                                chai.assert.equal(res.body.team[1], 'pikachu');
                                chai.assert.equal(res.body.team[2], 'charizard');
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
                        chai.assert.equal(res.statusCode, 200);
                        chai.request(app)
                            .get("/teams/")
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'elias');
                                chai.assert.equal(res.body.team[0], 'bulbasur');
                                chai.assert.equal(res.body.team[1], 'charizard');
                                done();
                                
                    });
            });
    });
});

