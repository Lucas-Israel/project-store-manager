const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');

const { expect } = chai;

chai.use(sinonChai);

describe('Testando a camada controller sales', function () {
  afterEach(sinon.restore);
  describe('Inserindo elementos na tabela de sales e sales_products', function () {
    it('É retornado status 201 e json correto', async function () {
      const expectedMessage = {
        id: 3,
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

      sinon
        .stub(salesService, 'insert')
        .resolves({ type: null, message: expectedMessage });

      const req = {
        body: [
          {
            productId: 1,
            quantity: 1
          },
          {
            productId: 2,
            quantity: 5
          }
        ] };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(expectedMessage);
    });
  });
})
