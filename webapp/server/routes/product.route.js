const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product.controller');

// get all products
router.get('/products', product_controller.getproducts);

//HTTP POST
router.post('/create', product_controller.product_create);

//HTTP GET by id
router.get('/:name', product_controller.product_details);

//HTTP PUT
router.put('/:codigobarra/update', product_controller.product_update);

//DELETE
router.delete('/:codigobarra/delete', product_controller.product_delete);

module.exports = router;