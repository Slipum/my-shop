import React, { useEffect, useState } from 'react';
import { addProduct, deleteProduct, getProducts, getUsers } from '../../../api';
import './Admin.css';

const Admin = () => {
	const [users, setUsers] = useState([]);
	const [products, setProducts] = useState([]);
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	// Загрузка пользователей
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getUsers();
				setUsers(response.data);
			} catch (err) {
				setError('Ошибка при загрузке пользователей');
			}
		};
		fetchUsers();
	}, []);

	// Загрузка товаров
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await getProducts();
				setProducts(response.data);
			} catch (err) {
				setError('Ошибка при загрузке товаров');
			}
		};
		fetchProducts();
	}, []);

	// Обработчик изменения выбранного изображения
	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	// Обработчик удаления продукта
	const handleDeleteProduct = async (productId) => {
		try {
			await deleteProduct(productId);
			setProducts(products.filter((product) => product.id !== productId));
			setMessage('Продукт успешно удален');
			setError('');
		} catch (error) {
			console.error('Ошибка при удалении продукта:', error);
			setError('Не удалось удалить продукт');
			setMessage('');
		}
	};

	// Обработчик отправки формы добавления продукта
	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', price);
		formData.append('description', description);
		formData.append('image', image);

		try {
			await addProduct(formData);
			setMessage('Продукт успешно добавлен');
			setError('');
			setName('');
			setPrice('');
			setDescription('');
			setImage(null);
			// Обновление списка продуктов
			const response = await getProducts();
			setProducts(response.data);
		} catch (error) {
			console.error('Ошибка при добавлении продукта:', error);
			setError('Не удалось добавить продукт');
			setMessage('');
		}
	};

	return (
		<>
			<div className="icon-container">
				<a href="/">
					<i className="fa-solid fa-right-from-bracket"></i>
				</a>
			</div>
			<div className="admin-container">
				<h1>Admin Panel</h1>
				<div className="reg-user">
					<h2>Registered Users</h2>
					<div className="list-us">
						<ul>
							{users.map((user) => (
								<li key={user.id}>{user.username}</li>
							))}
						</ul>
					</div>
				</div>
				<hr />
				<div className="add-p-container">
					<div className="add-p">
						<form onSubmit={handleSubmit}>
							<h2>Add Product</h2>
							{message && <p className="success-message">{message}</p>}
							{error && <p className="error-message">{error}</p>}
							<div className="form-controll">
								<label>Name:</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="form-controll">
								<label>Price:</label>
								<input
									type="number"
									step="0.01"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									required
								/>
							</div>
							<div className="form-controll">
								<label>Description:</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									required
								/>
							</div>
							<div className="form-controll">
								<label>Choose Image:</label>
								<input type="file" accept="image/*" onChange={handleImageChange} required />
							</div>
							<button type="submit">Submit Add</button>
						</form>
					</div>
				</div>
				<hr />
				<div className="all-products">
					<h2>Products</h2>
					<div className="products-grid">
						{products.map((product) => (
							<div className="s-product" key={product.id}>
								<img src={`http://localhost:3001/uploads/${product.image}`} alt={product.name} />
								<div className="product-info">
									<p>
										{product.name} - ${product.price}
									</p>
									<button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Admin;
