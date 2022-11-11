const sinon = require('sinon');
const { expect } = require('chai');

const { productsModel } = require('../../../src/models/');

const connection = require('../../../src/models/database/connection');

describe('Testando a camada model de products', function () {
  describe('Listagem de products', function () {
    before(async function () {
      const execute = [
        { id: 1, name: 'abc' },
        { id: 2, name: 'def' },
        { id: 3, name: 'ghi' },
      ];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async function () {
      connection.execute.restore();
    });

    it('Lista todos os products', async function () {
      const expected = [
        { id: 1, name: 'abc' },
        { id: 2, name: 'def' },
        { id: 3, name: 'ghi' },
      ]

      const response = await productsModel.findAll();

      expect(response).to.deep.equal(expected);
    });

    it('Lista um product expecifico por ID', async function () {
      const expected = { id: 2, name: 'def' }
    

      const response = await productsModel.findByID(2);

      expect(response).to.deep.equal(expected);
    });
  });
});
