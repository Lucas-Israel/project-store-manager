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

    it('Buscando items por ID', async function () {
      const execute = [{
        "id": 2,
        "date": "2022-11-13T20:36:19.000Z",
        "saleId": 2,
        "productId": 3,
        "quantity": 15
      }]

      sinon.stub(connection, 'execute').resolves([execute])

      const searchId = 2;

      const result = await salesModel.getById(searchId);

      expect(result).to.be.deep.equal(execute);
      connection.execute.restore();
    })
  });

  describe('Testando a rota del', function () {
    it('Deleta um elemento da tabela sales', async function () {
      const expectedResult = { affectedRows: 2 };

      sinon.stub(connection, 'execute').resolves([expectedResult])

      const sId = 1;

      const result = await salesModel.deleting(sId);

      expect(result).to.be.deep.equal(expectedResult);
      connection.execute.restore();
    });
  });
});