const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, salesProductsModel } = require('../../../src/models');

const { salesService } = require('../../../src/services');

describe('Testando camada services de sales ', function () {
  describe('Testando salesService.insert', function () {
    afterEach(function () {
      sinon.restore();
    });

    beforeEach(function () {
      sinon.stub(salesModel, 'insert').resolves({ insertId: 1 });
      sinon.stub(salesProductsModel, 'insert')
        .onCall(0)
        .resolves({
          productId: 1,
          quantity: 1
        })
        .onCall(1)
        .resolves({
          productId: 2,
          quantity: 5
        });
    });
    it('Insere com sucesso um ID na tabela sales.', async function () {
      const send = [
        {
          productId: 1,
          quantity: 1
        },
        {
          productId: 2,
          quantity: 5
        }
      ]

      const expectedResult = {
        id: 1,
        itemsSold: [
          {
            productId: 1,
            quantity: 1
          },
          {
            productId: 2,
            quantity: 5
          }
        ]
      }

      const result = await salesService.insert(send);

      expect(result.message).to.be.deep.equal(expectedResult);
    });

    it('Causa um erro ao tentar fazer operações sem o campo productId', async function () {
      const errorMessage = "\"productId\" is required";
      const errorType = 'INVALID_VALUE';

      const send = [{
        productId: 1,
        quantity: 1
      }];
      
      const result = await salesService.insert(send);

      expect(result.message).to.be.equal(errorMessage);
      expect(result.type).to.be.equal(errorType);
    });
  });
});