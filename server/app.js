import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import productRoutes from '../api/routes/products';
import orderRoutes from '../api/routes/orders';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.statusc= 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    erros: {
      message: error.message
    }
  })
})

export default app;
