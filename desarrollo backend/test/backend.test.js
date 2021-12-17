const chai = require('chai')
const chaihttp = require('chai-http')
chai.use(chaihttp)

const app = require('../app.js').app

describe('Suite de test del backend de la pokeapi', () =>{

    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post("/auth/login")
            .end((err, resul) =>{
                chai.assert.equal(resul.statusCode, 400, "no data provided");
                done();
            });
    });

    it('should return 200 for valid credentials', (done) => {
        chai.request(app)
            .post("/auth/login")
            .set('content-type', 'application/json')
            .send({ user: "elias", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200, 'valid credentials');
                done();
            });
    });

    it('Should return the team and the trainer when the login is correct and the user is valid', (done) => {
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
});
