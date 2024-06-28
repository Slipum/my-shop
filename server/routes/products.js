const express = require('express');
const db = require('../database');

const router = express.Router();

// Получение всех продуктов
const getAllProducts = (req, res) => {
	db.all(`SELECT * FROM products`, (err, products) => {
		if (err) {
			res.status(500).send('Error retrieving products');
		} else {
			res.json(products);
		}
	});
};

// Добавление нового продукта
const addProduct = (req, res) => {
	const { name, price, description, image } = req.body;

	if (!name || !price || !description) {
		return res.status(400).send('Name, price, and description are required');
	}

	db.run(
		`INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)`,
		[name, price, description, image],
		(err) => {
			if (err) {
				console.error('Error adding product:', err);
				res.status(500).send('Error adding product');
			} else {
				console.log('Product added successfully');
				res.status(200).send('Product added');
			}
		},
	);
};

// Удаление продукта по id
const deleteProduct = (req, res) => {
	const { id } = req.params;
	db.run(`DELETE FROM products WHERE id = ?`, [id], (err) => {
		if (err) {
			res.status(500).send('Error deleting product');
		} else {
			res.status(200).send('Product deleted');
		}
	});
};

// Определение маршрутов
router.get('/', getAllProducts);
router.post('/', addProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
