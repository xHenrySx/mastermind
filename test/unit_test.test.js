const assert = require('chai').assert;

function addvalue(a,b){
    return a+b;
}
 
describe('Test de ejemplo', () => {
    it('Ejemplo de sintaxis de mocha y chai', () =>{
        let varaible = addvalue(1,1);
        assert.equal(varaible, 2, 'Este era solo un test para practicar, no le hasgas caso')
    });
});
