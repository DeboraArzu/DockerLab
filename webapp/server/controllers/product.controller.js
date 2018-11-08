const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.getproducts = function (req, res) {
    Product.find({},{name: "", size:"", color:"", cost:"", status:""}, function(err, products){
        var productMap ={};
        products.forEach(function(product){
            productMap[product.codigo]=products;
        });
        res.send(productMap);
    });
};

//HTTP POST
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            size: req.body.size,
            color: req.body.color,
            cost: req.body.cost,
            status: req.body.status
        }
    );
//Save the information to the DB
    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

//HTTP GET
exports.product_details = function (req, res) {
    Product.find({codigo: req.params.id}, function (err, product) {
        if (err) return next(err);
        res.send(product); 
    })
};

//HTTP PUT
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

//DELETE
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};