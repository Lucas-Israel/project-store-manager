const { idSchema, productNameSchema } = require('./schemas');

const validateID = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateProductName = (name) => {
  const { error } = productNameSchema.validate(name);

  if (error.details[0].type === 'string.min') return { type: 'UNP_ENTITY', message: error.message };

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateID,
  validateProductName,
};