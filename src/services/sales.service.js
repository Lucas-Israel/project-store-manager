const { salesModel, salesProductsModel } = require('../models/index');
const { validatingObj, validatingProductIdExistense } = require('./validations/validations');

const insert = async (list) => {
  const { insertId } = await salesModel.insert();

  const errorMap = list.map((item) => validatingObj(item));

  if (errorMap.some((item) => item.message !== '')) {
  return {
      type: 'INVALID_VALUE',
      message: errorMap.find((item) => item.message !== '').message,
    }; 
  }

  const listOfId = await Promise
    .all(list.map(({ productId }) => validatingProductIdExistense(productId)));
  
  const boolOfListOfId = listOfId.some((item) => item.type);

  if (boolOfListOfId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const result = await Promise.all(list
    .map(({ productId, quantity }) => salesProductsModel.insert(insertId, productId, quantity)));

  return { type: null, message: { id: insertId, itemsSold: result } };
};

module.exports = {
  insert,
};