const express = require('express');

//const ClientsService = require('./../services/cliente.services');
const ClientsService = require('../services/cliente.services');
//const validatorHandler = require('./../middlewares/validator.handler');
const validatorHandler = require('../middlewares/validator.handler');
//const { createClientSchema, updateClientSchema, getClientSchema } = require('./../schemas/client.schema')
const { createClientSchema, updateClientSchema, getClientSchema } = require('../schemas/client.schema');

const router = express.Router();

const service = new ClientsService();

router.get('/', async (req, res, next)=>{
  try {
    const clientes = await service.find();
      res.json(clientes)

  } catch(error) {
    next(error)

  }


  });

  router.get('/:id',
  validatorHandler(getClientSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const clientes = await service.findOne(id);
    res.json(clientes);
  } catch(error) {
    next(error);

  }


    });



router.post('/',
validatorHandler(createClientSchema, 'body'),
async (req,res, next)=>{
  try {
    const body = req.body;
    const cliente = await service.create(body)
    res.status(201).json(cliente);

  } catch(error) {
  next(error);
}});

router.patch('/:id',
validatorHandler(getClientSchema, 'params'),
validatorHandler(updateClientSchema, 'body'),
async (req,res, next)=>{
  try {
    const { id } = req.params;
  const body = req.body;
  const cliente = await service.update(id, body);
  res.json(cliente);

  } catch(error) {
    next(error);
  }

})

router.delete('/:id',async (req,res)=>{
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta)
})

module.exports = router;
