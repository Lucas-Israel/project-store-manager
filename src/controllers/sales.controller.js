const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const insert = async (req, res) => {
  const list = req.body;
  const { type, message } = await salesService.insert(list);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const getAll = async (req, res) => {
  const { message } = await salesService.getAll();

  res.status(200).json(message);
};

module.exports = {
  insert,
  getAll,
};