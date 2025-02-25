require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Car = require('./models/Car');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.send('Welcome to the Express & MongoDB App!'));

// Create a new car
app.post('/cars', async (req, res) => {
    try {
        const { make, model, year, color, fuelType, transmission, seats, doors, price, status } = req.body;

        // Validate status
        const validStatuses = ["available", "sold", "reserved"];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({ error: "Invalid status. Allowed values: available, sold, reserved." });
        }

        const car = new Car({ make, model, year, color, fuelType, transmission, seats, doors, price, status });
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all cars
app.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single car by ID
app.get('/cars/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ error: "Car not found" });
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a car by ID
app.put('/cars/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCar) return res.status(404).json({ error: "Car not found" });
        res.json(updatedCar);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a car by ID
app.delete('/cars/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) return res.status(404).json({ error: "Car not found" });
        res.json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
