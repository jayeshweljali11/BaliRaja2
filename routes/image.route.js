const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('../shema/image.schema');
const Media  = require('../shema/media.schema');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


  
  // Upload media (image or video)
  router.post('/media', upload.single('media'), async (req, res) => {
    try {
      const { filename, path } = req.file;
      const { type } = req.body;
  
      const newMedia = new Media({
        filename,
        path,
        type,
      });
  
      await newMedia.save();
  
      res.status(201).json({ message: 'Media uploaded successfully', media: newMedia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get all media
  router.get('/', async (req, res) => {
    try {
      const media = await Media.find();
      res.status(200).json(media);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;
