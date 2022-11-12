const { productsModel } = require('../models/index');
const { validateID, validateProductName } = require('./validations/validations');

const findAll = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

const findByID = async (searchID) => {
  const error = validateID(searchID);

  if (error.type) return error;

  const result = await productsModel.findByID(searchID);

  if (result.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: result };

  return { type: null, message: result[0] };
};

const insert = async (name) => {
  const error = validateProductName(name);

  if (error.type) return error;

  const result = await productsModel.insert(name);

  return { type: null, message: result };
};

module.exports = {
  findAll,
  findByID,
  insert,
};