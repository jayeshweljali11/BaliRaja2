const express = require('express');
const router = express.Router();
const slidingPageService = require('../services/slidingPage.services');

// Get all sliding pages
router.get('/getAll', async (req, res) => {
  try {
    const slidingPages = await slidingPageService.getAllSlidingPages();
    res.json(slidingPages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new sliding page
router.post('/createSlide', async (req, res) => {
  try {
    const savedSlidingPage = await slidingPageService.createSlidingPage(
      req.body
    );
    res.json(savedSlidingPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific sliding page by ID
router.get('/:id', async (req, res) => {
  try {
    const slidingPage = await slidingPageService.getSlidingPageById(
      req.params.id
    );
    if (!slidingPage) {
      return res.status(404).json({ message: 'Sliding page not found' });
    }
    res.json(slidingPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a sliding page by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSlidingPage = await slidingPageService.updateSlidingPage(
      req.params.id,
      req.body
    );
    if (!updatedSlidingPage) {
      return res.status(404).json({ message: 'Sliding page not found' });
    }
    res.json(updatedSlidingPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a sliding page by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSlidingPage = await slidingPageService.deleteSlidingPage(
      req.params.id
    );
    if (!deletedSlidingPage) {
      return res.status(404).json({ message: 'Sliding page not found' });
    }
    res.json(deletedSlidingPage ,);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
