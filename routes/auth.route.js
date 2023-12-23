const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');


// Register a new user
router.post('/register', authService.register);

// Login
router.post('/login', authService.login);

router.get('/user/:id', async (req, res) => {
    try {
        const user = await authService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});
router.get('/api/users', async (req, res) => {
    try {
      const users = await authService.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.get('/api/users/:id', async (req, res) => {
    try {
      const user = await authService.findById(req.params.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a user by ID
  router.put('/api/users/:id', async (req, res) => {
    try {
      const user = await authService.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a user by ID
  router.delete('/api/users/:id', async (req, res) => {
    try {
      const user = await authService.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
