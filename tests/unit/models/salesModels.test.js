const sinon = require('sinon');
const { expect } = require('chai');

const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/database/connection');

describe('Testando a camada model de sales', function () {
  describe('Testando a rota post', function () {
    it('Adicionando um item nas tabelas sales e product_sales', async function () {
      const execute = { insertId: 4 };

      sinon.stub(connection, 'execute').resolves([execute]);

      const expectedResponse = { insertId: 4};

      const result = await salesModel.insert();

      expect(result).to.be.deep.equal(expectedResponse);
      connection.execute.restore();
    });
  });

  describe('Testando a rota get', function () {
    it('Buscando todos os items da tabela sales', async function () {
      const executee = [{
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }];
      
      sinon.stub(connection, 'execute').resolves([executee])

      const result = await salesModel.getAll();

      expect(result).to.be.instanceOf(Array);
      expect(result).to.be.deep.equal(executee);
      connection.execute.restore();
    })
  });
});