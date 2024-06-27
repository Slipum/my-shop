const express = require('express');
const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
	db.all(`SELECT * FROM products`, (err, products) => {
		if (err) throw err;
		res.json(products);
	});
});

router.post('/', (req, res) => {
	const { name, price, description, image } = req.body;
	db.run(
		`INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)`,
		[name, price, description, image],
		(err) => {
			if (err) {
				res.status(500).send('Error adding product');
			} else {
				res.status(200).send('Product added');
			}
		},
	);
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db.run(`DELETE FROM products WHERE id = ?`, [id], (err) => {
		if (err) {
			res.status(500).send('Error deleting product');
		} else {
			res.status(200).send('Product deleted');
		}
	});
});

module.exports = router;
