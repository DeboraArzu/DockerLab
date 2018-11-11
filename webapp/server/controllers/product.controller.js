const express = require('express');
const app = express();
const Product = require('../models/product.model');
const redis = require('redis');
const REDIS_URL = process.env.REDIS_URL;
const client = redis.createClient(REDIS_URL);

//Simple version, without validation or sanitation
exports.getproducts = function (req, res) {
    Product.find({}, { name: "", size: "", color: "", cost: "", status: "", codigobarra:"" }, function (err, products) {
        var productMap = {};
        products.forEach(function (product) {
            productMap[product.codigo] = products;
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
            status: req.body.status,
            codigobarra: req.body.status
        }
    );
    //Save the information to the DB
    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
        insert(req.body.name, product)
    })
    
};

//HTTP GET
exports.product_details = function (req, res) {
    Product.find({ name: req.params.name }, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

//HTTP PUT
exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.codigobarra, { $set: req.body }, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

//DELETE
exports.product_delete = function (req, res) {
    redis_deleted(req.params.codigobarra)
    Product.findByIdAndRemove(req.params.codigobarra, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
        deletedata(req.params.codigobarra)
    })
};

function insert(name, product) {
    client.hmset(name, [
        'name', product.name,
        'size', product.size,
        'color', product.color,
        'cost', product.cost,
        'status', product.status
    ], function(err, reply){
        if(err){
            console.log(err)
        }
        console.log(reply)
    })
}

function deletedata(codigobarra){
    client.del(codigobarra);
  }
  