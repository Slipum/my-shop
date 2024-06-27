const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const db = require('../database');

router.get('/', requireAuth, (req, res) => {
	const userId = req.user.id;
	db.get('SELECT username, email FROM users WHERE id = ?', [userId], (err, user) => {
		if (err) {
			console.error('Error fetching user profile:', err);
			return res.status(500).json({ message: 'Internal server error' });
		}
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ username: user.username, email: user.email });
	});
});

module.exports = router;
