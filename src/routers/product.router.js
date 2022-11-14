const express = require('express');
const validadteProductBody = require('../middlewares/validateProductBody');

const { productsController } = require('../controllers/index');

const router = express.Router();

router.get('/', productsController.findAll);

router.get('/:id', productsController.findByID);

router.post('/', productsController.insert);

router.put('/:id', validadteProductBody, productsController.update);

module.exports = router;