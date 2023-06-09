const { productsModel } = require('../models/index');
const { validateID, validateProductName,
  validatingProductIdExistense } = require('./validations/validations');

const findAll = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

const findByID = async (searchID) => {
  const error = validateID(searchID, 'id');

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

const update = async (pId, name) => {
  const error = await validatingProductIdExistense(pId);

  if (error.type) return error;

  const result = await productsModel.update(pId, name);

  return { type: null, message: result };
};

const deleting = async (pId) => {
  const error = await validatingProductIdExistense(pId);

  if (error.type) return error;

  const result = await productsModel.deleting(pId);

  return { type: null, message: result };
};

const query = async (search) => {
  if (!search) return findAll();

  const result = await productsModel.query(search);
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findByID,
  insert,
  update,
  deleting,
  query,
};