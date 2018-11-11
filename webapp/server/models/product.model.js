const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClothSchema = new Schema({
    name: { type: String, required: true, max: 100 },
    size: { type: String, required: true, max: 100 },
    color: { type: String, required: true, max: 100 },
    cost: { type: Number, required: true },
    status: { type: Number, required: true, default:0},
    codigobarra: {type: Number, require: true}
});


// Export the model
module.exports = mongoose.model('Cloth', ClothSchema);