const { idSchema, productObject } = require('./schemas');

const validateID = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateProductName = (name) => {
  const { error } = productObject.validate(name);

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateID,
  validateProductName,
};