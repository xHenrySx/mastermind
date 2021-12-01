const assert = require('chai').assert;

function addvalue(a,b){
    return a+b;
}
 
describe('Prueba para el curso', () => {
    it('should return 2', () =>{
        let varaible = addvalue(1,1);
        assert.equal(varaible, 2)
    });
});
