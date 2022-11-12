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

      const send = 4;

      const result = await salesModel.insert(send);

      expect(result).to.be.deep.equal(expectedResponse);
      connection.execute.restore();
    });
  });
});