const chai = require('chai')
const chaihttp = require('chai-http')
chai.use(chaihttp)

const app = require('../app.js').app


const userControllers = require('../users/users.controller');

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
    it('Valid user credentials', (done) => {
        chai.request(app)
            .post("/auth/login")
            .set('content-type', 'application/json')
            .send({ user: "elias", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200, 'Login succesfull');
                done();
            });
    });

    it('Invalid user credentials', (done) => { 
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'elias', password: '9807'})
            .end((err, res) =>{
                chai.assert.equal(res.statusCode, 401, 'Invalid credential')
                done();
            })
    })

    // crear un nuevo usuario con nuevo equipo
    it('Create a new team and a new acount for the user', (done) => {
        chai.request(app)
            .post("/users/")
            .send({userName: "nuevo", password: "1234" })
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200)
                done();
            });
    });

    // consultar el equipo del usuario
    it('should return the users team', (done) => {
        chai.request(app)
            .post("/auth/login")
            .set('content-type', 'application/json')
            .send({ user: "elias", password: "1234" })
            .end((err, res) => {
                let token = res.body.token;
                chai.request(app)
                    .get("/teams/")
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200, 'login succesfull');
                        chai.assert.equal(res.body.trainer, 'elias');
                        chai.assert.equal(res.body.team[0], 'bulbasur');
                        chai.assert.equal(res.body.team[1], 'pikachu');
                        done();
                    })
            })
    })

});

