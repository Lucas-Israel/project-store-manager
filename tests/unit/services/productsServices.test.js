const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');

const { productsService } = require('../../../src/services');

describe('Testando a camada service dos products', function () {
  describe('Testando o productsServices.findAll', function () {
    it('A message de products é um array', async function () {
      const result = await productsService.findAll();
  
      expect(result.message instanceof Array).to.equal(true);
    });
  
    it('Retorna a lista de products com sucesso', async function () {
      const expectedResult = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];
  
      const result = await productsService.findAll();
      
      expect(result.message).to.be.deep.equal(expectedResult)
    });
  })

  describe('Testando o productsServices.findByID', function () {
    it('A message de findById é um array', async function () {
      const result = await productsService.findByID(2);

      expect(result.message instanceof Array).to.equal(true);
    });

    it('Retorna uma lista com o product de ID especifico', async function () {
      const expectedResult = [{ id: 2, name: 'Traje de encolhimento' }];

      const result = await productsService.findByID(2);

      expect(result.message).to.be.deep.equal(expectedResult)
    });

    it('Retorna um erro ao procurar um product de ID não existente', async function () {
      
    });
  });
});