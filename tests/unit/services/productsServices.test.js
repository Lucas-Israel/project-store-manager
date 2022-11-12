const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');

const { productsService } = require('../../../src/services');

describe('Testando a camada service dos products', function () {
  describe('Testando o productsServices.findAll', function () {
    afterEach(function () {
      sinon.restore();
    });

    beforeEach(function () {
      const send = [
        { id: 1, name: 'Martelo de Tho' },
        { id: 2, name: 'Traje de encolhiment' },
        { id: 3, name: 'Escudo do Capitão Améric' },
      ];

      sinon.stub(productsModel, 'findAll').resolves(send);
    });

    it('A message de products é um array', async function () {
      const result = await productsService.findAll();
  
      expect(result.message instanceof Array).to.equal(true);
    });
  
    it('Retorna a lista de products com sucesso', async function () {
      const expectedResult = [
        { id: 1, name: 'Martelo de Tho' },
        { id: 2, name: 'Traje de encolhiment' },
        { id: 3, name: 'Escudo do Capitão Améric' },
      ];
  
      const result = await productsService.findAll();
      
      expect(result.message).to.be.deep.equal(expectedResult)
    });
  })

  describe('Testando o productsServices.findByID', function () {
    after(function () {
      sinon.restore();
    });

    before(function () {
      const send = [{ id: 2, name: 'Traje de encolhiment' }];

      sinon
        .stub(productsModel, 'findByID')
        .onCall(0)
        .resolves(send)
        .onCall(1)
        .resolves(send)
        .onCall(2)
        .resolves([])
        ;
    });

    it('A message de findById é um objeto', async function () {
      const result = await productsService.findByID(2);

      expect(result.message instanceof Object).to.equal(true);
    });

    it('Retorna uma lista com o product de ID especifico', async function () {
      const expectedResult = { id: 2, name: 'Traje de encolhiment' };

      const result = await productsService.findByID(2);

      expect(result.message).to.be.deep.equal(expectedResult);
    });

    it('Retorna um erro ao procurar um product de ID não existente e uma lista vazia', async function () {
      const result = await productsService.findByID(999);

      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.be.deep.equal([]);
    });

    it('Retorna um erro ao passar ID a como busca', async function () {
      const result = await productsService.findByID('a');

      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.be.equal('O campo "value" deve ser um numero');
    });
  });

  describe('Testando o productsServices.insert', function () {
    afterEach(function () {
      sinon.restore();
    });

    beforeEach(function () {
      sinon.stub(productsModel, 'insert').resolves({ id: 5, name: 'abcde' });
    });

    it('Retorna um erro ao não passar o campo name', async function () {
      const expectedResult = "\"name\" is required"

      const result = await productsService.insert();

      expect(result.message).to.be.equal(expectedResult);
    });

    it('Retorna um erro ao passar um body.name com menos de 5 caracteres', async function () {
      const expectedResult = "\"name\" length must be at least 5 characters long";
      const name = 'abc'

      const result = await productsService.insert(name);

      expect(result.message).to.be.equal(expectedResult);
    });

    it('Insere com sucesso um product', async function () {
      const expectedResult = { id: 5, name: 'abcde' }

      const name = 'abcde'

      const result = await productsService.insert(name);

      expect(result.message).to.be.deep.equal(expectedResult);
    });
  });
});