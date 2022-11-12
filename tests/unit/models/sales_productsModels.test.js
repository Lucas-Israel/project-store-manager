const sinon = require('sinon');
const { expect } = require('chai');

const { salesProductsModel } = require('../../../src/models');

const connection = require('../../../src/models/database/connection');

describe('Testando a camada model de salesProducts', function () {
  describe('Testando o insert', function () {
    it('Insere um novo elemento na tabela sales_products.', async function () {
      const expectedResult = { productId: 2, quantity: 20 }

      const send = { saleId: 1, productId: 2, quantity: 20 }

      const result = await salesProductsModel.insert(send.saleId, send.productId, send.quantity);

      expect(result).to.be.deep.equal(expectedResult);
    })
  });
});


