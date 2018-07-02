import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product';

const router = express.Router();

router.get('/', (req, res) => {
	Product.find()
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(docs);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.post('/', (req, res) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});

	product
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Handling POST req. to /products',
				createdProduct: result
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;

	Product.findById(id)
		.exec()
		.then(doc => {
			console.log('From DB', doc);
			if (doc) res.status(200).json(doc);
			else
				res
					.status(404)
					.json({ message: 'Not found item by given ID' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.patch('/:productId', (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};

	for (const ops of req.body)
		updateOps[ops.propName] = ops.value;

	Product.update(
		{ _id: id },
		{ $set: { updateOps } }
	)
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.delete('/:productId', (req, res, next) => {
	const id = req.params.productId;
	Product.findOneAndRemove({ _id: id })
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

export default router;
