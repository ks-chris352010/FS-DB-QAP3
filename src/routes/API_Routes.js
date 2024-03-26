const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('./dal/DataAccess');

// GET all users:
router.get('/users', async (req, res) => {
    try {
      const users = await getAllUsers();
      res.render('index', { users }); // Render index.ejs with users data
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).render('error'); // Render error.ejs in case of error
    }
  });

// GET user by ID:
router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create new user:
router.post('/users', async (req, res) => {
  const { username, email, password, rank } = req.body;
  try {
    await createUser(username, email, password, rank);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update user:
router.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, email, password, rank } = req.body;
  try {
    await updateUser(userId, username, email, password, rank);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE delete user:
router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
