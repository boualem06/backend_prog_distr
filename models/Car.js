const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    seats: { type: Number, required: true },
    doors: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    images: [{ type: String }] 
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
