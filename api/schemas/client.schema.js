const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(50);
const email = Joi.string().email();
const telefono = Joi.number().integer();

const createClientSchema = Joi.object({
  nombre: nombre.required(),
  email: email.required(),
  telefono: telefono.required(),
});

const updateClientSchema = Joi.object({
  nombre: nombre,
  email:email,
  telefono: telefono,
});

const getClientSchema = Joi.object({
  id: id.required(),

});

module.exports = { createClientSchema, updateClientSchema, getClientSchema }
