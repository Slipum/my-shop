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
		const cartItems = await db.getCartItemsWithDetailsAsync(userId);
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

	console.log(`Adding product ${productId} to cart for user ${userId}`);

	try {
		const existingItem = await db.getAsync(
			'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
			[userId, productId],
		);

		console.log('Existing item:', existingItem);

		if (existingItem) {
			console.log('Item already in cart, updating quantity');
			const updateResult = await db.runAsync(
				'UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?',
				[userId, productId],
			);
			console.log('Update result:', updateResult);
		} else {
			console.log('Item not in cart, inserting new item');
			const insertResult = await db.runAsync(
				'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)',
				[userId, productId],
			);
			console.log('Insert result:', insertResult);
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
		const existingItem = await db.getAsync(
			'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
			[userId, productId],
		);

		if (!existingItem) {
			return res.status(404).json({ message: 'Item not found in cart' });
		}

		let updateQuantity = existingItem.quantity - 1;
		if (updateQuantity < 1) {
			// Если количество становится меньше 1, удаляем запись
			const result = await db.runAsync('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [
				userId,
				productId,
			]);

			if (result.changes === 0) {
				return res.status(404).json({ message: 'Item not found in cart' });
			}
		} else {
			// Иначе обновляем количество
			const updateResult = await db.runAsync(
				'UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?',
				[updateQuantity, userId, productId],
			);

			console.log('Update result:', updateResult);
		}

		res.status(200).json({ message: 'Item removed from cart' });
	} catch (error) {
		console.error('Error removing item from cart:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = router;
