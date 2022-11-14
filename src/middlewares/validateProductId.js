module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: '"id" is required' });

  if (+id === 0) return res.status(422).json({ message: '"id" must be higher than 0' });

  return next();
};