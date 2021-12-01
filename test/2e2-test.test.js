const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

const app = require('../app').app


describe('Suite de test',() => {
    it('should return 401 when the token is invalid', (done) => {
        // cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get('/team')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            })
            
        it('should return 200 if token is valid', (done) => {
            // para el login del usuario
            chai.request(app)
                .post('/login')
                .end((err, res) => {
                    chai.request(app)
                        .get('/team')
                        .set("Authorization",`JWT ${res.body.token}` )
                        .end((err, res) => {
                            chai.assert.equal(res.statusCode, 200);
                            done();
                        })
                })
        });
        /*it('should return 401', (done) => {
        // cuando la llamada no tiene correctamente la llave
    });*/
    });
});
