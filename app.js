const express = require('express');
const app = express();
const morgan = require('morgan');
const BodyParser = require('body-parser');



const productPaths = require('./api/paths/product');
const LoginPaths = require('./api/paths/userlogins');
const OrderPaths = require('./api/paths/orders');



app.use(morgan('dev'));
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());


app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


app.use('/product', productPaths);
app.use('/Orders', OrderPaths);
app.use('/userlogins', LoginPaths);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);

})

app.use((error, req, res, next) => {

  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
  
})


module.exports = app;