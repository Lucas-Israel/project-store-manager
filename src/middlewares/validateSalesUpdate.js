const validateSalesUpdate = (req, res, next) => {
  const list = req.body;

  if (list.some(({ productId }) => !productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (list.some(({ quantity }) => quantity !== 0 && !quantity)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (list.some(({ quantity }) => quantity < 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

module.exports = validateSalesUpdate;