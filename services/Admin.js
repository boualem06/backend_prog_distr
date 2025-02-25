const express = require('express');
const router = express.Router();

// Mock data
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// Get all users
router.get('/', (req, res) => {
    res.json(users);
});

// Get a specific user
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});

module.exports = router;
