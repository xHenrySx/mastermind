const assert = require('chai').assert;

function addvalue(a,b){
    return a+b;
}
 
describe('Prueba para el curso', () => {
    it('should return 2, ese solo una practica de la sintaxis y el uso de mocha', () =>{
        let varaible = addvalue(1,1);
        assert.equal(varaible, 2, 'Este era solo un test para practicar, no le hasgas caso')
    });
});
