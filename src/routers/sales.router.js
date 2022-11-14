const express = require('express');
const validateSalesUpdate = require('../middlewares/validateSalesUpdate');

const { salesController } = require('../controllers/index');

const router = express.Router();

router.post('/', salesController.insert);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.delete('/:id', salesController.deleting);

router.put('/:id', validateSalesUpdate, salesController.update);

module.exports = router;