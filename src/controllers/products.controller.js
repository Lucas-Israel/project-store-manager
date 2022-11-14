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

const insert = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insert(name);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const { type, message } = await productsService.update(id, name);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleting = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleting(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(204).json();
};

const query = async (req, res) => {
  const { q } = req.query;

  const { message } = await productsService.query(q);

  res.status(200).json(message);
};

module.exports = {
  findAll,
  findByID,
  insert,
  update,
  deleting,
  query,
};