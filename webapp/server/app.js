// app.js
const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Imports routes for the products
const app = express();
//redis cache
const redis = require('redis');
const methodoverride = require('method-override');
const exphbs = require('express-handlebars');
var cache = require('express-redis-cache')({
    port: 6379,
    host: 'localhost',
    authPass: null,
    prefix: 'home',
    enabled: true
});
// connect to Redis
const client = redis.createClient();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://admin:manager123@ds235243.mlab.com:35243/clothcollection';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

//puerto mongo
let port = 4000;

//view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('cache', cache)
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/home', product);

//method override
app.use(methodoverride('method'));

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// client.on('connect', () => {
//     console.log(`connected to redis`);
// });
// client.on('error', function (err) {
//     console.log('error')
// }) 

module.exports = app;