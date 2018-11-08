const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/products', product_controller.getproducts);

//HTTP POST
router.post('/create', product_controller.product_create);

//HTTP GET by id
router.get('/:id', product_controller.product_details);

//HTTP PUT
router.put('/:id/update', product_controller.product_update);

//DELETE
router.delete('/:id/delete', product_controller.product_delete);

module.exports = router;