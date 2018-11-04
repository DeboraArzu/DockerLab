const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClothSchema = new Schema({
    codigo: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    cost: {type: Number, required: true},
    size: {type: String, required: true, max: 100},
    color: {type: String, required: true, max: 100},
});


// Export the model
module.exports = mongoose.model('Cloth', ClothSchema);