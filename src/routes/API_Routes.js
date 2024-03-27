const express = require('express');
const router = express.Router();
const { getAll, getEntryById, createEntry, updateEntry, deleteEntry } = require('../dal/DataAccess');

// GET all entries:
router.get('/entries', async (req, res) => {
  try {
    const entries = await getAll();
    res.render('index', { entries }); 
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).render('error'); 
  }
});

// GET entry by ID:
router.get('/entries/:id', async (req, res) => {
  const entryId = req.params.id;
  try {
    const entry = await getEntryById(entryId);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    console.error('Error fetching entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create new entry:
router.post('/entries', async (req, res) => {
  const { name, number } = req.body; 
  try {
    await createEntry(name, number);
    res.status(201).json({ message: 'Entry created successfully' });
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update entry:
router.put('/edit/:id', async (req, res) => {
  const entryId = req.params.id;
  const { name, number } = req.body; 
  try {
    await updateEntry(entryId, name, number);
    res.json({ message: 'Entry updated successfully' });
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE delete entry:
router.delete('/entries/:id', async (req, res) => {
    const entryId = req.params.id;
    try {
      await deleteEntry(entryId);
      res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  
  
module.exports = router;
