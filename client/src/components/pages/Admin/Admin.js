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

	// Загрузка пользователей
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getUsers();
				setUsers(response.data);
			} catch (err) {
				alert('Error fetching users');
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
				alert('Error fetching products');
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
			alert('Продукт успешно удален');
		} catch (error) {
			console.error('Ошибка при удалении продукта:', error);
			alert('Не удалось удалить продукт');
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
			alert('Продукт успешно добавлен');
			setName('');
			setPrice('');
			setDescription('');
			setImage(null);
		} catch (error) {
			console.error('Ошибка при добавлении продукта:', error);
			alert('Не удалось добавить продукт');
		}
	};

	return (
		<div className="admin-container">
			<h1>Admin Panel</h1>

			<h2>Registered Users</h2>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.username}</li>
				))}
			</ul>

			<hr />

			<h2>Add Product</h2>
			<form onSubmit={handleSubmit}>
				<label>Name:</label>
				<input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
				<br />
				<label>Price:</label>
				<input
					type="number"
					step="0.01"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
				/>
				<br />
				<label>Description:</label>
				<textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
				<br />
				<label>Choose Image:</label>
				<input type="file" accept="image/*" onChange={handleImageChange} required />
				<br />
				<button type="submit">Submit Add</button>
			</form>

			<hr />

			<h2>Products</h2>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						{product.name} - ${product.price}{' '}
						<button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Admin;
