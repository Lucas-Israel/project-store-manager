const { salesModel } = require('../models/index');
const { salesProductsModel } = require('../models/index');

const insert = async (list) => {
  const { insertId } = await salesModel.insert();
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