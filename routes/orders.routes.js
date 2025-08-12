const express = require('express');
const ordersController = require('../controllers/orders.controller.js');

const router = express.Router();

router.post('/',ordersController.addOrder);
router.get('/',ordersController.getOrders);


module.exports = router;