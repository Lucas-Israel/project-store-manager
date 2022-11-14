const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models/');

const connection = require('../../../src/models/database/connection');

describe('Testando a camada model de products', function () {
  describe('Testando a rota get', function () {
    before(async function () {
      const execute = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      const execute2 = [
        { id: 2, name: 'Traje de encolhimento' },
      ];

      const execute3 = [];

      sinon
        .stub(connection, 'execute')
        .onCall(0)
        .resolves([execute])
        .onCall(1)
        .resolves([execute2])
        .onCall(2)
        .resolves([execute3])
        ;
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Lista todos os products', async function () {
      const expected = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

      const response = await productsModel.findAll();

      expect(response).to.deep.equal(expected);
    });

    it('Lista um product expecifico por ID', async function () {
      const expected = [{ id: 2, name: 'Traje de encolhimento' }];
    
      const response = await productsModel.findByID(2);

      expect(response).to.deep.equal(expected);
    });

    it('Caso não tenha um produto com ID, retorna uma lista vazia', async function () {
      const expected = [];

      const response = await productsModel.findByID(999);

      expect(response).to.deep.equal(expected);
    });
  });

  describe('Testando a rota post', function () {
    it('Adicionando um item', async function () {
      const execute = {insertId: 4};

      sinon.stub(connection, 'execute').resolves([execute]);

      const name = 'teste'

      const expectedResponse = {id: 4, name: 'teste'};

      const result = await productsModel.insert(name);

      expect(result).to.be.deep.equal(expectedResponse);
      connection.execute.restore();
    });
  })

  describe('Testando a rota put', function () {
    it('Atualiza um elemento com sucesso', async function () {
      const expectedResponse = {
        "id": 1,
        "name": "Martelo do Batman"
      };

      sinon.stub(connection, 'execute').resolves([expectedResponse]);

      const pId = 1;

      const toUpdate = "Martelo do Batman";

      const result = await productsModel.update(pId, toUpdate);

      expect(result).to.be.deep.equal(expectedResponse);
      connection.execute.restore();
    });
  });

  describe('Testando a rota del', function () {
    it('Deleta um elemento com sucesso', async function () {
      const expectedResponse = {affectedRows: 1};

      sinon.stub(connection, 'execute').resolves([expectedResponse]);

      const result = await productsModel.deleting(3);

      expect(result).to.be.deep.equal(expectedResponse);
      connection.execute.restore();
    })
  });
});
