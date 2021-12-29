const chai = require('chai')
const chaihttp = require('chai-http')
chai.use(chaihttp)

const app = require('../app.js').app


const userControllers = require('../controllers/usersDB');

describe('Suite de test de la base de datos de usuario', function () {
    this.beforeAll(() => {
        // crear un usuario de pruebas 
        userControllers.registerUser({userName: "elias", password: "1234"});
    });
    this.afterAll(function (){userControllers.cleanUp()});
    this.timeout(4000)

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
            .post("/users/")
            .send({ user: "marcos", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200)
                done();
            });
    });
});

