const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const https = require('https');
const session = require('express-session');

const app = express();
const port = 8080;
const PASSWORD = '';

const mediaDir = path.join(__dirname, 'media');

// Ensure the media directory exists
if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir);
}

// Use CORS to allow communication from the HTML file
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

app.use(session({
    secret: '', // Replace with a real secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Set to true if using HTTPS
}));

// Middleware to protect routes
const requireAuth = (req, res, next) => {
    if (req.session.authenticated) {
        next();
    } else {
        res.redirect('/login.html');
    }
};

const configsDir = path.join(__dirname, 'configs');

// Ensure the configs directory exists
if (!fs.existsSync(configsDir)) {
    fs.mkdirSync(configsDir);
}

// Route for saving lock screen configuration
app.post('/save-lock-config', requireAuth, (req, res) => {
    const { lockId, configData } = req.body;
    if (!lockId || !configData) {
        return res.status(400).json({ error: 'Missing lockId or configData' });
    }
    const configFilePath = path.join(configsDir, `${lockId}.json`);
    fs.writeFile(configFilePath, JSON.stringify(configData, null, 2), (err) => {
        if (err) {
            console.error('Failed to save lock config:', err);
            return res.status(500).json({ error: 'Failed to save configuration' });
        }
        res.json({ message: 'Configuration saved successfully' });
    });
});

// Route for loading lock screen configuration
app.get('/load-lock-config/:lockId', requireAuth, (req, res) => {
    const lockId = req.params.lockId;
    const configFilePath = path.join(configsDir, `${lockId}.json`);
    fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ error: 'Configuration not found' });
            }
            console.error('Failed to load lock config:', err);
            return res.status(500).json({ error: 'Failed to load configuration' });
        }
        try {
            const config = JSON.parse(data);
            res.json(config);
        } catch (parseErr) {
            console.error('Failed to parse lock config:', parseErr);
            res.status(500).json({ error: 'Failed to parse configuration' });
        }
    });
});

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD) {
        req.session.authenticated = true;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

app.get('/media-manager', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'media_manager.html'));
});

app.get('/select-media', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'select_media.html'));
});

// Serve static files from the 'media' directory first
app.use('/media', express.static(mediaDir));

// Serve static files from the project root (for all other assets)
app.use(express.static(__dirname));
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
app.post('/upload', requireAuth, upload.array('files'), (req, res) => {
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
app.delete('/delete/:filename', requireAuth, (req, res) => {
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

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(port, '0.0.0.0', () => {
    console.log(`Server listening at https://localhost:${port}`);
});
