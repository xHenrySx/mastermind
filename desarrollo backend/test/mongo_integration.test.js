const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require("../app").app;

const userControllers = require('../users/users.controller');
const teamsControllers = require('../teams/teams.controller');

describe('Suite de integracion con mongo', function () {
    this.timeout(3000)

    it('should return 200 when a new user is created', function (done) {
        chai.request(app)
            .post('/users/')
            .send({userName: "elias", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 200 when login succesfull', function (done) {
        chai.request(app)
            .get('/users/')
            .set('content-type', 'application/json')
            .send({ user: "elias", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                done();
            })
    });
});
