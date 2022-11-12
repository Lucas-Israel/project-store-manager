const { idSchema, productNameSchema, objWithIds } = require('./schemas');

const validateID = (id, label) => {
  const { error } = idSchema.label(label).validate(id);

  if (error) return { type: 'INVALID_VALUE', message: error.message };
  return { type: null, message: '' };
};

const validateProductName = (name) => {
  const { error } = productNameSchema.validate(name);

  if (error && error.details[0].type === 'string.min') {
    return { type: 'UNP_ENTITY', message: error.message };
  }

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validatingObj = ({ productId, quantity }) => {
  const { error } = objWithIds.validate({ productId, quantity });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateID,
  validateProductName,
  validatingObj,
};