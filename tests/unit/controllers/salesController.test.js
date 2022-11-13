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

    it('É retornado status 404 e o json apropriado para um erro', async function () {
      sinon
        .stub(salesService, 'insert')
        .resolves({ type: 'INVALID_VALUE' });

      const req = { body: { oi: 'oi' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });
  });

  describe('Testando a camada controllers getAll', function () {
    it('Mostra com sucesso os elementos retornado por getAll', async function () {
      const expectedResult = [{
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

      sinon
        .stub(salesService, 'getAll')
        .resolves({ type: null, message: expectedResult });
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectedResult);
    });
  });

  describe('Testando a camada controller getById', function () {
    it('Mostra com sucesso o elemento retornado por getById', async function () {
      const expectedResult = [{
        "id": 2,
        "date": "2022-11-13T20:36:19.000Z",
        "saleId": 2,
        "productId": 3,
        "quantity": 15
      }];

      sinon
        .stub(salesService, 'getById')
        .resolves({ type: null, message: expectedResult });
      const req = { params: { id: 2}};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectedResult);
    });
  });
})
