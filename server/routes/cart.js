const express = require('express');
const router = express.Router();
const db = require('../database');
const { requireAuth } = require('../middleware/authMiddleware');

// Middleware для проверки аутентификации
const isAuthenticated = (req, res, next) => {
	if (req.session && req.session.userId) {
		return next();
	}
	res.status(401).json({ message: 'Unauthorized' });
};

// Маршрут для получения данных корзины
router.get('/', isAuthenticated, async (req, res) => {
	const userId = req.session.userId;
	try {
		const sql = `
      SELECT c.id, c.product_id, c.quantity, p.name AS product_name, p.price
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `;
		const cartItems = await db.all(sql, [userId]);
		res.json(cartItems);
	} catch (error) {
		console.error('Error fetching cart items:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// Маршрут для добавления товара в корзину
router.post('/', isAuthenticated, async (req, res) => {
	const userId = req.session.userId;
	const { productId } = req.body;

	try {
		const existingItem = await db.get('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [
			userId,
			productId,
		]);

		if (existingItem) {
			await db.run('UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?', [
				userId,
				productId,
			]);
		} else {
			await db.run('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)', [
				userId,
				productId,
			]);
		}

		res.status(201).json({ message: 'Item added to cart' });
	} catch (error) {
		console.error('Error adding item to cart:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// Маршрут для удаления товара из корзины
router.delete('/:productId', isAuthenticated, async (req, res) => {
	const userId = req.session.userId;
	const productId = parseInt(req.params.productId, 10);

	try {
		const result = await db.run('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [
			userId,
			productId,
		]);

		if (result.changes === 0) {
			return res.status(404).json({ message: 'Item not found in cart' });
		}

		res.status(200).json({ message: 'Item removed from cart' });
	} catch (error) {
		console.error('Error removing item from cart:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = router;
