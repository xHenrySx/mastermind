const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de pruebas del backend de la pokeapi', ()=> {

    /*// test del jwt (llamada) a /team
    it('shoud return 401 when no jwt available', (done) =>{
        // cuando la llamada no cuenta con el jwt
        chai.request(app)
            .post('/team')
            .end((err, res) => {
                chai.assert(res.statusCode, 401, 'missing token');
                done();
            });
    });*/
    
    //test del proceso login sin informacion 
    it('should return 400 when no data is provided', (done) => {
        // cuando el usuario no envia informacion al login
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                chai.assert(res.statusCode, 400, 'any data was provided');
                done();
            });
    });

    //test del proceso login con informacion valida
    it('should return 200 when the /login is valid', (done) => {
        chai.request(app)
            .post('/login')
            .send({user: 'elias', password: '0000'})
            .end((err, res) => {
                // expected valid login
                chai.assert.equal(res.statusCode, 200, 'succesfull login')
                done();
            });
    });

    // test completo de llamada y login con jwt y usuario
    it('should return 200 when the complete login is succesfull (llamada y usuario)', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({user: 'elias', password: '0000'})
            .end((err, res) => {
                chai.request(app)
                    .get('/team')
                    .send('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200, 'Token valido');
                        done();
                    });
            });
    });
});
