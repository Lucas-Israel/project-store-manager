const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const insert = async (req, res) => {
  const { body } = req;
  const { message } = await salesService.insert(list);

  res.status(201).json(message);
};

module.exports = {
  insert,
};