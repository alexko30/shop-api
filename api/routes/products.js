import express from 'express';

const router = express.Router();

router.get('/', (req, res) =>{
  res.status(200).json({
    message: "Handling GET req. to /products"
  })
});

router.post('/', (req, res) =>{
  res.status(201).json({
    message: "Handling POST req. to /products"
  })
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;

  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    });
  }
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Updated product'
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Deleted product'
  });
});

export default router;
