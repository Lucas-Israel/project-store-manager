const { salesModel, salesProductsModel } = require('../models/index');
const { validatingObj, validatingProductIdExistense,
  validateID } = require('./validations/validations');

const insert = async (list) => {
  const errorMap = list.map((item) => validatingObj(item));

  if (errorMap.some((item) => item.message !== '')) {
  return {
      type: errorMap.map((item) => item.type)[0],
      message: errorMap.find((item) => item.message !== '').message,
    }; 
  }

  const listOfId = await Promise
    .all(list.map(({ productId }) => validatingProductIdExistense(productId)));
  
  const boolOfListOfId = listOfId.some((item) => item.type);

  if (boolOfListOfId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const { insertId } = await salesModel.insert();

  const result = await Promise.all(list
    .map(({ productId, quantity }) => salesProductsModel.insert(insertId, productId, quantity)));

  return { type: null, message: { id: insertId, itemsSold: result } };
};

const getAll = async () => {
  const result = await salesModel.getAll();

  const message = result.map(({ id, ...others }) => others);

  return { type: null, message };
};

const getById = async (sId) => {
  const error = validateID(sId, 'id');

  if (error.type) return error;

  const result0 = await salesModel.getById(sId);

  if (result0.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const result = await salesModel.getById(sId);

  const message = result.map(({ saleId, id, ...others }) => others);

  return { type: null, message };
};

const deleting = async (sId) => {
  const result0 = await salesModel.getById(sId);

  if (result0.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const result1 = await salesModel.deleting(sId);

  return { type: null, message: result1 };
};

const update = async (sId, list) => {
  const sales = await getById(sId);

  const salesList = sales.message;

  if (salesList === 'Sale not found') return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const [result] = await Promise.all(list
    .map(({ productId, quantity }, i) => {
      const { productId: oldPId, quantity: oldPQant } = salesList[i];
    const updateResult = salesModel
      .update({ what: { pId: productId, pQant: quantity }, where: { sId, oldPId, oldPQant } });
    
    return updateResult;
    }));

  return { type: null, message: result };
};

module.exports = {
  insert,
  getAll,
  getById,
  deleting,
  update,
};