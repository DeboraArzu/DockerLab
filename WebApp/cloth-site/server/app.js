/** require dependencies */
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const product = require('./routes/product.route')
const app = express()

// Set up mongoose connection
//let dev_db_url = 'mongodb://admin:manager123@ds235243.mlab.com:35243/clothcollection';
let dev_db_url = 'mongodb://localhost:27017';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/home', product);

let port = 4000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});