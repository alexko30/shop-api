import express from 'express';
import productRoutes from '../api/routes/products';
import orderRoutes from '../api/routes/orders';

const app = express();

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

export default app;
