const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'resume-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter function to validate file type
const fileFilter = (req, file, cb) => {
    // Check if file is PDF
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

// Configure multer with file size and type restrictions
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB limit
        files: 1 // Only allow 1 file per request
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Resume upload endpoint
app.post('/upload-resume', upload.single('resume'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        res.json({
            success: true,
            message: 'Resume uploaded successfully!',
            file: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error uploading file',
            error: error.message
        });
    }
});

// Error handling middleware for multer errors
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File too large. Maximum size is 2MB.'
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                message: 'Too many files. Only one file allowed.'
            });
        }
    }
    
    if (error.message === 'Only PDF files are allowed!') {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
    });
});

// Get list of uploaded resumes
app.get('/resumes', (req, res) => {
    try {
        const files = fs.readdirSync(uploadsDir);
        const resumeFiles = files
            .filter(file => file.startsWith('resume-'))
            .map(file => {
                const filePath = path.join(uploadsDir, file);
                const stats = fs.statSync(filePath);
                return {
                    filename: file,
                    size: stats.size,
                    uploadDate: stats.mtime
                };
            });
        
        res.json({
            success: true,
            resumes: resumeFiles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error reading resumes',
            error: error.message
        });
    }
});

// Download resume endpoint
app.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({
            success: false,
            message: 'File not found'
        });
    }
});

// Delete resume endpoint
app.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadsDir, filename);
    
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({
                success: true,
                message: 'Resume deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'File not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting file',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Job Portal Server running on http://localhost:${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
});
