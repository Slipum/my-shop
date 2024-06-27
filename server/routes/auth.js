const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database');

const router = express.Router();

router.post('/register', (req, res) => {
	const { username, email, password } = req.body;
	// 1. Проверка наличия email
	db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
		if (err) {
			console.error(err); // Обработка ошибки db
			return res.status(500).send('Internal server error');
		}
		if (user) {
			return res.status(400).send('Email already exists'); // Email уже существует
		}
		// 2. Хеширование пароля (если email не найден)
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) throw err;
			// 3. Добавление пользователя в db (если email не найден)
			db.run(
				`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
				[username, email, hash],
				(err) => {
					if (err) {
						console.error(err); // Обработка ошибки db
						return res.status(500).send('Internal server error');
					}
					res.status(200).send('User registered');
				},
			);
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
	req.session.destroy((err) => {
		if (err) throw err;
		res.status(200).send('Logged out');
	});
});

module.exports = router;
