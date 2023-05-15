const Joi = require('joi');

const id = Joi.string();
const nombre = Joi.string().min(3).max(50);
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

const createClientSchema = Joi.object({
  nombre: nombre.required(),
  email:email.required(),
});

const updateClientSchema = Joi.object({
  nombre: nombre,
  email:email,
});

const getClientSchema = Joi.object({
  id: id.required(),

});

module.exports = { createClientSchema, updateClientSchema, getClientSchema }
