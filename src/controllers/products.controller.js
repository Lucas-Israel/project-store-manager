const { productsService } = require('../services');
const { mapError } = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { message } = await productsService.findAll();

  res.status(200).json(message);
};

const findByID = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findByID(id);

  if (type) return res.status(mapError(type)).json({ message: 'Product not found' });

  res.status(200).json(message);
};

module.exports = {
  findAll,
  findByID,
};