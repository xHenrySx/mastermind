const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

const app = require('../app').app


describe('Suite de test',() => {
    it('should return hello world', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                console.log('A');
                chai.assert.equal(res.text, 'Hello world');
                done();
            });
        console.log('B');
    });
});
