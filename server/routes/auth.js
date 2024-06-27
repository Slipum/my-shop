const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');

const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hash], (err) => {
            if (err) {
                res.status(500).send('User already exists');
            } else {
                res.status(200).send('User registered');
            }
        });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(404).send('User not found');
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    req.session.userId = user.id;
                    res.status(200).send('Logged in');
                } else {
                    res.status(401).send('Invalid password');
                }
            });
        }
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.status(200).send('Logged out');
    });
});

module.exports = router;
