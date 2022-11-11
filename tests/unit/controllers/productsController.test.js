const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { productsService } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');

const { expect } = chai;

chai.use(sinonChai);

describe('Verificando camada controller products', function () {
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

    it('É retornado um erro aonão achar um ID', async function () {
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
});