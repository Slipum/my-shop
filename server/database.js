const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shop.db');

db.serialize(() => {
	db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            email VARCHAR(255) UNIQUE,
            password TEXT
        )
    `);

	db.run(`
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            product_id INTEGER,
            quantity INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )
    `);

	db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price REAL,
            description TEXT,
            image TEXT
        )
    `);
});

// Методы для выполнения SQL-запросов
db.runAsync = function (sql, params = []) {
	return new Promise((resolve, reject) => {
		this.run(sql, params, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve({ id: this.lastID, changes: this.changes });
			}
		});
	});
};

db.getAsync = function (sql, params = []) {
	return new Promise((resolve, reject) => {
		this.get(sql, params, (err, row) => {
			if (err) {
				reject(err);
			} else {
				resolve(row);
			}
		});
	});
};

db.allAsync = function (sql, params = []) {
	return new Promise((resolve, reject) => {
		this.all(sql, params, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
};

// Запрос для получения товаров в корзине с полной информацией
db.getCartItemsWithDetailsAsync = function (userId) {
	const sql = `
			SELECT c.id, c.product_id, c.quantity, p.name AS product_name, p.price, p.description, p.image
			FROM cart c
			JOIN products p ON c.product_id = p.id
			WHERE c.user_id = ?
	`;
	return this.allAsync(sql, [userId]);
};

module.exports = db;
