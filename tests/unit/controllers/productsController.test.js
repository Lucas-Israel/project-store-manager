const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { productsService } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');

const { expect } = chai;

chai.use(sinonChai);

describe('Testando a camada controller products', function () {
  afterEach(sinon.restore);
  describe('Listando todos os products', function () {
    it('É retornado status 200 e json correto', async function () {
      const expectedResult = [
        { id: 1, name: 'Martelo de Tho' },
        { id: 2, name: 'Traje de encolhiment' },
        { id: 3, name: 'Escudo do Capitão Améric' },
      ];

      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: null, message: expectedResult });

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectedResult);
    });
  });

  describe('Listando products por ID', function () {
    it('É retornado status 200 e json correto ao passar o ID 2', async function () {
      const expectedResult = { id: 2, name: 'Traje de encolhiment' };

      sinon
        .stub(productsService, 'findByID')
        .resolves({ type: null, message: expectedResult });

      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.findByID(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectedResult);
    });

    it('É retornado um erro ao não achar um ID', async function () {
      sinon
        .stub(productsService, 'findByID')
        .resolves({ type: 'PRODUCT_NOT_FOUND' });

      const req = { params: { id: 999999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.findByID(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('Inserindo novos products', function () {
    it('Retorna um erro 400 ao não ser passado o body.name', async function () {
      sinon
        .stub(productsService, 'insert')
        .resolves({ type: 'INVALID_VALUE' });

      const req = { body: { oi: 'oi' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(400);
    });

    it('Insere corretamente um product novo', async function () {
      const expectedMessage = { id: 4, name: 'abcde' }

      sinon
        .stub(productsService, 'insert')
        .resolves({ type: null, message: { id: 4, name: 'abcde' } });

      const req = { body: { name: 'abcde' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(expectedMessage);
    });
  });

  describe('Atualizando products', function () {
    it('Atualiza com sucesso', async function () {
      const expectedMessage = { id: 4, name: 'Martelo do Batman' }

      sinon
        .stub(productsService, 'update')
        .resolves({ type: null, message: { id: 4, name: 'Martelo do Batman' } });

      const req = { body: { name: 'Martelo do Batman' }, params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expectedMessage);
    });

    it('Retorna erro ao não receber o body corretamente', async function () {
      const expectedMessage = "\"name\" is required";

      sinon
        .stub(productsService, 'update')
        .resolves({ type: 'INVALID_VALUE', message: expectedMessage });

      const req = { body: { name: 'Martelo do Batman' }, params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({message: expectedMessage});
    });
  });

  describe('Deletando products', function () {
    it('Retorna um erro ao passar um ID de um produto que não existe', async function () {
      sinon
        .stub(productsService, 'deleting')
        .resolves({ type: 'PRODUCT_NOT_FOUND' });

      const req = { params: { id: '99999' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.deleting(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });

    it('Deleta com sucesso um elemento', async function () {
      sinon.stub(productsService, 'deleting')
        .resolves({ type: null, message: { affectedRows: 1 } });

      const req = { params: { id: '3' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.deleting(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });
  });
});