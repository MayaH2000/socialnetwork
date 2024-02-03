const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model here

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST a new user
router.post('/users', async (req, res) => {
  const { username, email } = req.body;
  try {
    const newUser = new User({ username, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Bad Request' });
  }
});

module.exports = router;
