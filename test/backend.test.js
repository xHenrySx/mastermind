const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../app').app;

describe('Test de aplicacion backend', ()=> {

    it('should return 200 when the token is valid', (done) => {
        // cuando el token es valido
        chai.request(app)
            .post('/login')
            .send({user: 'Manolo', password: '12345'})
            .end((err, res) => {
                chai.request(app)
                    .get('/team')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200, 'Token valido');
                        done();
                    });
            });
    });

    /*
    it('should return 403 when the user has no permissions', (done) => {
          // cuando el usuario no tiene permiso para realizar alguna accion
        chai.request(app)
            .get('/team')
            .end((err, res) => {
                chai.expect(res.statusCode).equal(401, 'clave invalida')
            })
    })
    */
})
