const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');

const { expect } = chai;

chai.use(sinonChai);

describe('Testando a camada controller sales', function () {
  // afterEach(sinon.restore);
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
        ]
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(expectedMessage);

      sinon.restore()
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

      sinon.restore()
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

      sinon.restore()
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
      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectedResult);

      sinon.restore()
    });

    it('Retorna um erro ao procurar um elemento com ID não existente', async function () {
      const expectedResult = { message: [] };

      sinon
        .stub(salesService, 'getById')
        .resolves({ type: 'SALE_NOT_FOUND', message: [] });
      const req = { params: { id: 255 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(expectedResult);

      sinon.restore()
    })
  });

  describe('Testando a camada controller deleting', function () {
    it('Retorna um erro ao passar o id de uma sale que não existe', async function () {
      sinon
        .stub(salesService, 'deleting')
        .resolves({ type: 'SALE_NOT_FOUND' });

      const req = { params: { id: '99999' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.deleting(req, res);

      expect(res.status).to.have.been.calledWith(404);

      sinon.restore()
    });

    it('Deleta um sale com sucesso', async function () {
      sinon.stub(salesService, 'deleting')
        .resolves({ type: null, message: { affectedRows: 2 } });

      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.deleting(req, res);

      expect(res.status).to.have.been.calledWith(204);

      sinon.restore()
    });
  });

  describe('Testando a camada controller update', function () {
    it('Atualiza um sale com sucesso', async function () {
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

      sinon.stub(salesService, 'update')
        .resolves({
          type: null, message: [{
            productId: 3,
            quantity: 30,
          }]
        });

      const req = { params: { id: 2 }, body: { productId: 3, quantity: 30 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);

      sinon.restore()
    });

    it('Retorna um erro se não tiver o parametro productId no body', async function () {
      const expectedMessage = "Sale not found";

      sinon
        .stub(salesService, 'update')
        .resolves({ type: 'SALE_NOT_FOUND', message: expectedMessage });

      const req = { body: [{ productId: 1, quantity: 1 }], params: { id: 3 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: expectedMessage });

      sinon.restore()
    });
  });
})
