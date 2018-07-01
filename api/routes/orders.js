import express from 'express';

const router = express.Router();

router.get('/', (req, res, nest) => {
	res.status(200).json({
		message: 'Orders were fetched'
	});
});

router.post('/', (req, res, nest) => {
	res.status(201).json({
		message: 'Order was created'
	});
});

router.get('/:orderId', (req, res, nest) => {
	res.status(200).json({
		message: 'Order details',
		orderId: req.params.orderId
	});
});

router.delete('/:orderId', (req, res, nest) => {
	res.status(200).json({
		message: 'Order deleted',
		orderId: req.params.orderId
	});
});

export default router;
