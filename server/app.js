import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import productRoutes from '../api/routes/products';
import orderRoutes from '../api/routes/orders';

const app = express();

mongoose.connect(
	`mongodb+srv://shop-api:${
		process.env.MONGO_ATLAS_PW
	}@cluster0-s3lcm.mongodb.net/test?retryWrites=true`
);

app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);

		return res.status(200).json({});
	}

	next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		erros: {
			message: error.message
		}
	});
});

export default app;
