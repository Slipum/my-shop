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

module.exports = db;
