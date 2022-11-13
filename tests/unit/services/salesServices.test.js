const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, salesProductsModel, productsModel } = require('../../../src/models');

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
      sinon.stub(productsModel, 'findByID').resolves([{ id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' }]);
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
      sinon.stub(productsModel, 'findByID').resolves([]);
      const errorMessage = "\"productId\" is required";
      const errorType = 'INVALID_VALUE';

      const send = [{
        quantity: 1
      }];
      
      const result = await salesService.insert(send);

      expect(result.message).to.be.equal(errorMessage);
      expect(result.type).to.be.equal(errorType);
    });

    it('Causa um erro ao tentar fazer operações com um productId não existente no banco', async function () {
      sinon.stub(productsModel, 'findByID').resolves([]);
      
      const errorMessage = "Product not found";
      const errorType = 'PRODUCT_NOT_FOUND';

      const send = [{
        productId: 999999,
        quantity: 1
      }];

      const result = await salesService.insert(send);

      expect(result.message).to.be.equal(errorMessage);
      expect(result.type).to.be.equal(errorType);
    });
  });
});