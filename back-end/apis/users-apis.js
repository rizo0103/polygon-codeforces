const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require('../db/tasksDb');
const router = express.Router(); // Use Router instead of express()

const jwt_secret = 'ADIYA_OFIGEVSHAYA-DURA';

// Set up storage for Multer with path and unique filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../polygon-codeforces/public/avatars'));
    },
    filename: (req, file, cb) => {
        const username = req.body.username;
        cb(null, `${username}-${file.originalname}`);
    }
});

// Configure Multer middleware with file type and size restrictions
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const username = req.body.username;
        const mimeType = fileTypes.test(file.mimetype); // Corrected typo (was `file.mimeType`)
        const extname = fileTypes.test(path.extname(`${username}-${file.originalname}`).toLowerCase());

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
        const sql = `INSERT INTO users (username, password, fullname, avatarTitle, email, tasks) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [username, password, fullname, avatarTitle || 'defaultAvatar.png', email, "[]"];

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

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    try {
        db.query(sql, [username, password], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }
    
            if (results.length === 0) {
                console.log('User was not found');
                return res.status(404).json({ message: 'User was not found' });
            }
    
            // console.log(results);
            const token = jwt.sign({ id: results[0].id }, jwt_secret, { expiresIn: '10h' });
            return res.status(200).json({ message: 'Successfully logged in', access_token: token });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); 
    }

    jwt.verify(token, jwt_secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user; 
        next(); 
    });
};

router.get('/get-user-data', authenticateToken, (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ?`;

    db.query(sql, [req.user.id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        if (results.length === 0) {
            console.log('User was not found');
            return res.status(404).json({ message: 'User was not found' });
        }

        // Return the first result only (the user object)
        return res.status(200).json({ message: 'Successfully retrieved user data', data: results[0] });
    });
});

module.exports = router;
