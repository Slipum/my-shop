const express = require('express');
const db = require('../database');

const router = express.Router();

router.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, (err, users) => {
        if (err) throw err;
        res.json(users);
    });
});

module.exports = router;
