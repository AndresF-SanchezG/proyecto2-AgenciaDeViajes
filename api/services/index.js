const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');


const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co', 'http://127.0.0.1:5502'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));



// app.get('/api', (req, res)=>{
//   res.send('Bienvenido a la página de aterriza')
// })

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  console.log('Puerto 3000')
});




