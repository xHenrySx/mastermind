const chai = require('chai')
const chaihttp = require('chai-http')
chai.use(chaihttp)

const app = require('../app.js').app

describe('Suite de test del backend de la pokeapi', () =>{

    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post("/login")
            .end((err, resul) =>{
                chai.assert.equal(resul.statusCode, 400, "no data provided");
                done();
            })
    })

    it('should return 200 for valid credentials', (done) => {
        chai.request(app)
            .post("/login")
            .set('content-type', 'aplication/json')
            .send({ user: "elias", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200, 'valid credentials');
                done();
            })
    })

    it('Should return 200 when the login+jwt is succesfull', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'aplication/json')
            .send({user: "elias", password: "1234"})
            .end((err, res) => {
                    chai.request(app)
                    .get("/team")
                    .set("Authorizaton", `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200)
                        done();
                    });
            });
    });
});
