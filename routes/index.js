const express = require('express')
const datosCliente = require('./clientesRouter')

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/datos-clientes', datosCliente)
}

module.exports = routerApi;
