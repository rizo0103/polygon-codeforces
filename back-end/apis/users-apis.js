const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../db/tasksDb');
const router = express.Router(); // Use Router instead of express()

// Set up storage for Multer with path and unique filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../polygon-codeforces/public/avatars'));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

// Configure Multer middleware with file type and size restrictions
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimeType = fileTypes.test(file.mimetype); // Corrected typo (was `file.mimeType`)
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed (JPEG, JPG, PNG)'));
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB size limit
});

// Register route with file upload and database insert logic
router.post('/register', upload.single('avatar'), async (req, res) => {
    const { username, fullname, email, password } = req.body;
    const avatarTitle = req.file ? req.file.filename : null;

    try {
        const sql = `INSERT INTO users (username, password, fullname, avatarTitle, email, solvedTasks, unsolvedTasks) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [username, password, fullname, `${username}-${avatarTitle}`, email, "[]", "[]"];

        db.query(sql, values, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(422).json({ message: `Database error: ${err}` });
            }

            return res.status(201).json({ message: 'User created successfully', data: results });
        });
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({ error: error });
    }
});

module.exports = router;
