const { idSchema, productNameSchema, objWithIds } = require('./schemas');
const { productsModel } = require('../../models/index');

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

  const errorType = error && error.message.includes('required') ? 'INVALID_VALUE' : 'UNP_ENTITY';

  if (error) return { type: errorType, message: error.message };

  return { type: null, message: '' };
};

const validatingProductIdExistense = async (pId) => {
  const result = await productsModel.findByID(pId);

  if (result.length === 0) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; 

  return { type: null, messge: '' };
};

module.exports = {
  validateID,
  validateProductName,
  validatingObj,
  validatingProductIdExistense,
};