const Joi = require('joi');

const idSchema = Joi.number().min(1).required()
  .messages({
    'any.required': 'O campo {#label} é obrigatório',
    'number.empty': 'O campo {#label} não pode estar vázio',
    'number.base': 'O campo {#label} deve ser um numero',
    'number.min': 'O campo {#label} deve ser maior que 0',
  });

const productNameSchema = Joi.string().min(5).required();

const productObject = Joi.object({
  name: productNameSchema,
}).messages({
  'any.required': '{#label} is required',
  'string.empty': '{#label} cannot be empty',
  'string.base': '{#label} must be a string',
  'string.min': '{#label} length must be at least {#limit} characters long',
});

module.exports = {
  idSchema,
  productObject,
};