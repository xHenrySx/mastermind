const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require("../app").app;

const userControllers = require('../users/users.controller');
const teamsControllers = require('../teams/teams.controller');

describe('Suite de integracion con mongo', function () {
    // configuraciones generales del test
    this.beforeEach(async () => {
        // crear un usuario de pruebas 
        const user = await userControllers.registerUser("elias", "1234");
        await userControllers.registerUser("marcos", "1234");
        return 
    });

    this.afterEach(async () => {await userControllers.cleanUp()});
    this.timeout(9000);

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
