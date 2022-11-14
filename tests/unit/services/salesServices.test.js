const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, salesProductsModel, productsModel } = require('../../../src/models');

const { salesService, productsService } = require('../../../src/services');

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

  describe('Testando salesService.getAll', function () {
    afterEach(function () {
      sinon.restore();
    });

    beforeEach(function () {
      const execute = [{
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
  
      sinon.stub(salesModel, 'getAll').resolves(execute)
    });

    it('Retorna todos os elementos de getAll', async function () {
      const result = await salesService.getAll();

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

      expect(result.message).to.be.deep.equal(expectedResult);
    });
  });

  describe('Testando salesService.getById', function () {
    afterEach(function () {
      sinon.restore();
    });

    beforeEach(function () {
      const execute = [{
        "id": 2,
        "date": "2022-11-13T20:36:19.000Z",
        "saleId": 2,
        "productId": 3,
        "quantity": 15
      }];

      sinon.stub(salesModel, 'getById').resolves(execute)
    });
    it('Retorna o elemento correto', async function () {
      const expectedResult = [{
        "date": "2022-11-13T20:36:19.000Z",
        "productId": 3,
        "quantity": 15
      }]

      const result = await salesService.getById(2);

      expect(result.message).to.be.deep.equal(expectedResult)
    });

    it('Retorna um erro ao tentar procurar um ID que não exista', async function () {
      sinon.restore();

      const execute = [];

      sinon.stub(salesModel, 'getById').resolves(execute)

      const expectedResult = 'Sale not found'

      const result = await salesService.getById(999999999);

      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.be.deep.equal(expectedResult);
    });

    it('Retorna um erro ao tentar procurar sem passar ID', async function () {
      const expectedResult = 'O campo "id" é obrigatório'

      const result = await salesService.getById();

      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.be.equal(expectedResult);
    });
  });

  describe('Testando salesServices.deleting', function () {
    it('Retorna um erro ao tentar deletar um sale que não existe', async function () {
      sinon.stub(salesModel, 'getById').resolves([]);

      const sId = 9999;

      const result = await salesService.deleting(sId);

      expect(result).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      sinon.restore();
    });

    it('Deleta com sucesso', async function () {
      sinon.stub(salesModel, 'getById').resolves([{
        "id": 2,
        "date": "2022-11-13T20:36:19.000Z",
        "saleId": 2,
        "productId": 3,
        "quantity": 15
      }]);

      sinon.stub(salesModel, 'deleting').resolves({affectedRows: 2})

      const sId = 2;

      const result = await salesService.deleting(sId);

      expect(result).to.be.deep.equal({type: null, message: {affectedRows: 2}})
      sinon.restore();
    });
  });

  describe('Testando salesServices.update', function () {
    it('Atualiza com sucesso', async function () {
      const expectedResult = [{
        productId: 2,
        quantity: 100,
      }]

      const execute = [{
        "id": 2,
        "date": "2022-11-13T20:36:19.000Z",
        "saleId": 2,
        "productId": 3,
        "quantity": 15
      }];

      // sinon.stub(productsService, 'findByID').resolves([{ id: 3, name: 'Escudo do Capitão América' }])

      sinon.stub(salesModel, 'getById').resolves(execute)

      sinon.stub(salesModel, 'update').resolves(expectedResult);

      const sId = 2;

      const list = [{
        "productId": 3,
        "quantity": 15
      }];

      const result = await salesService.update(sId, list);

      expect(result).to.be.deep.equal({ type: null, message: expectedResult });
      sinon.restore();
    });

    it('Retorna um erro ao tentar atualizar uma venda não existente', async function () {
      const expectedResult = []

      const execute = [];

      sinon.stub(salesService, 'getById').resolves(execute)

      sinon.stub(salesModel, 'update').resolves(expectedResult);

      const sId = 25;

      const list = [{
        "productId": 3,
        "quantity": 15
      }];

      const result = await salesService.update(sId, list);

      expect(result).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      sinon.restore();
    });

    it('Retorna um erro ao tentar atualizar um produto que não existe no database', async function () {
      const expectedResult = []

      const execute = [{
        "id": 2,
        "date": "2022-11-13T20:36:19.000Z",
        "saleId": 2,
        "productId": 3,
        "quantity": 15
      }];

      sinon.stub(salesService, 'getById').resolves(execute);

      // sinon.stub(productsService, 'findByID').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      sinon.stub(salesModel, 'update').resolves(expectedResult);

      const sId = 2;

      const list = [{
        "productId": 50,
        "quantity": 15
      }];

      const result = await salesService.update(sId, list);

      expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      sinon.restore();
    });
  });
});