const { salesModel } = require('../models/index');
const { salesProductsModel } = require('../models/index');
const { validatingObj } = require('./validations/validations');

const insert = async (list) => {
  const { insertId } = await salesModel.insert();

  // const error = validateID(insertId);

  // console.log(`Log do erro de insertId ${error.message}`);

  const errorMap = list.map((item) => validatingObj(item));

  if (errorMap.some((item) => item.message !== '')) {
  return {
      type: 'INVALID_VALUE',
      message: errorMap.find((item) => item.message !== '').message,
    }; 
  }

  const result = await Promise.all(list
    .map(({ productId, quantity }) => salesProductsModel.insert(insertId, productId, quantity)));

  const newResult = {
    id: insertId,
    itemsSold: result,
  };

  return { type: null, message: newResult };
};

module.exports = {
  insert,
};