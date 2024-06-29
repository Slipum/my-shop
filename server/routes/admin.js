const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database');
const productsRouter = require('./products'); // Импортируем весь роутер products

const router = express.Router();

// Путь к папке uploads
const uploadDirectory = path.join(__dirname, '../uploads');

// Проверка существования папки uploads
if (!fs.existsSync(uploadDirectory)) {
	// Создание папки uploads, если она не существует
	fs.mkdirSync(uploadDirectory);
}

// Получение списка пользователей
router.get('/users', (req, res) => {
	db.all(`SELECT * FROM users`, (err, users) => {
		if (err) throw err;
		res.json(users);
	});
});

// Получение списка продуктов
router.get('/products', (req, res) => {
	db.all(`SELECT * FROM products`, (err, products) => {
		if (err) throw err;
		res.json(products);
	});
});

// Удаление продукта
router.delete('/products/:productId', async (req, res) => {
	const productId = req.params.productId;

	try {
		// Удаляем продукт из таблицы products
		const result = await db.runAsync('DELETE FROM products WHERE id = ?', [productId]);

		if (result.changes === 0) {
			return res.status(404).json({ message: 'Product not found' });
		}

		// Теперь удаляем товар из корзины всех пользователей
		await db.runAsync('DELETE FROM cart WHERE product_id = ?', [productId]);

		res.status(200).json({ message: 'Product and related cart items deleted' });
	} catch (error) {
		console.error('Error deleting product and related cart items:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// Конфигурация Multer для загрузки файлов
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage: storage });

// Добавление нового продукта
router.post('/products', upload.single('image'), (req, res) => {
	const { name, price, description } = req.body;
	const image = req.file.filename;

	db.run(
		'INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)',
		[name, price, description, image],
		function (err) {
			if (err) {
				console.error('Error adding product:', err);
				res.status(500).json({ message: 'Internal server error' });
			} else {
				res.status(201).json({ message: 'Product added successfully' });
			}
		},
	);
});

module.exports = router;
