const { productsModel } = require('../models/index');

const findAll = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

const findByID = async (searchID) => {
  const result = await productsModel.findByID(searchID);

  return { type: null, message: result };
};

module.exports = {
  findAll,
  findByID,
};