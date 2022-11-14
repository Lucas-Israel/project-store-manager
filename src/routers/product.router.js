const express = require('express');
const validateProductBody = require('../middlewares/validateProductBody');
const validadeProductId = require('../middlewares/validateProductId');

const { productsController } = require('../controllers/index');

const router = express.Router();

router.get('/search', productsController.query);

router.get('/', productsController.findAll);

router.get('/:id', productsController.findByID);

router.post('/', productsController.insert);

router.put('/:id', validateProductBody, productsController.update);

router.delete('/:id', validadeProductId, productsController.deleting);

module.exports = router;