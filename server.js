const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

const mediaDir = path.join(__dirname, 'media');

// Ensure the media directory exists
if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir);
}

// Use CORS to allow communication from the HTML file
app.use(cors());

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/media-manager', (req, res) => {
    res.sendFile(path.join(__dirname, 'media_manager.html'));
});

// Serve static files from the project root
app.use(express.static(__dirname));

// Serve static files from the 'media' directory
app.use('/media', express.static(mediaDir));

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, mediaDir);
    },
    filename: function (req, file, cb) {
        // Use a timestamp to avoid filename conflicts
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route for handling file uploads
app.post('/upload', upload.array('files'), (req, res) => {
    res.json({ message: 'Files uploaded successfully!' });
});

// Route for getting the list of media files
app.get('/media-files', (req, res) => {
    fs.readdir(mediaDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read media directory' });
        }
        // Filter out non-media files if necessary (e.g., .DS_Store)
        const mediaFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.png', '.jpg', '.jpeg', '.gif', '.mp4', '.webm', '.ogg'].includes(ext);
        });
        res.json(mediaFiles);
    });
});

// Route for deleting a media file
app.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(mediaDir, filename);

    // Basic security check to prevent path traversal
    if (path.dirname(filePath) !== mediaDir) {
        return res.status(400).json({ error: 'Invalid file path' });
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete file' });
        }
        res.json({ message: 'File deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
