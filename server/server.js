const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const profileRoutes = require('./routes/profile');
const cartRoutes = require('./routes/cart');

const app = express();
const PORT = 3001;

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	session({
		store: new SQLiteStore(),
		secret: 'secret-key',
		resave: false,
		saveUninitialized: false,
	}),
);

// Middleware для обслуживания статических файлов из папки uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
