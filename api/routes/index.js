const express = require('express')
const datosCliente = require('../routes/clientesRouter')



function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  //app.use('/api', router);
  router.use('/datos-clientes', datosCliente)
}



module.exports = routerApi;
