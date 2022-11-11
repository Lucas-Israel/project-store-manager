const Joi = require('joi');

const idSchema = Joi.number().min(1).required();
  // .required.messages({
  //   'any.required': 'O campo {#label} é obrigatório',
  //   'number.empty': 'O campo {#label} não pode estar vázio',
  //   'number.base': 'O campo {#label} deve ser um numero',
  //   'number.min': 'O campo {#label} deve ser maior que 0',
  // });

module.exports = {
  idSchema,
};