const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/environmentClub', { useNewUrlParser: true, useUnifiedTopology: true });

const imageSchema = new mongoose.Schema({
    filename: String,
    path: String
});
const Image = mongoose.model('Image', imageSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// Serve static files
app.use(express.static('uploads'));

// Routes
app.post('/upload', upload.single('image'), async (req, res) => {
    const image = new Image({
        filename: req.file.filename,
        path: req.file.path
    });
    await image.save();
    res.json({ message: 'Image uploaded successfully!' });
});

app.get('/images', async (req, res) => {
    const images = await Image.find();
    res.json(images);
});

app.delete('/images/:filename', async (req, res) => {
    const { filename } = req.params;
    await Image.findOneAndDelete({ filename });
    fs.unlink(path.join('uploads', filename), err => {
        if (err) return res.status(500).json({ message: 'Error deleting file' });
        res.json({ message: 'Image deleted successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
