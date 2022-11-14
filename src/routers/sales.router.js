const express = require('express');

const { salesController } = require('../controllers/index');

const router = express.Router();

router.post('/', salesController.insert);

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.delete('/:id', salesController.deleting);

module.exports = router;