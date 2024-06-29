import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../../../api';
import Header from '../../business/Header/Header';
import './Cart.css';

const Cart = () => {
	const [cartItems, setCartItems] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await getCart();
				setCartItems(response.data);
			} catch (error) {
				console.error('Error fetching cart items:', error);
				setError(`Failed to load cart items: ${error.message}`);
			}
		};

		fetchCartItems();
	}, []);

	const handleRemoveFromCart = async (productId) => {
		try {
			await removeFromCart(productId);
			// Обновляем состояние корзины после удаления
			const response = await getCart();
			setCartItems(response.data);
		} catch (error) {
			console.error('Error removing item from cart:', error);
			setError(`Failed to remove item from cart: ${error.message}`);
		}
	};

	return (
		<>
			<Header />
			<div className="cart-container">
				<h2>Shopping Cart</h2>
				{error ? (
					<div className="error">{error}</div>
				) : (
					<ul className="cart-items">
						{Array.isArray(cartItems) && cartItems.length > 0 ? (
							cartItems.map((item) => (
								<li className="cart-item" key={item.id}>
									<img
										src={`http://localhost:3001/uploads/${item.image}`}
										alt={item.product_name}
										className="cart-item-image"
									/>
									<div className="cart-item-info">
										<h3>{item.product_name}</h3>
										<p>{item.description}</p>
										<p>Price: ${item.price.toFixed(2)}</p>
										<p>Quantity: {item.quantity}</p>
										<button onClick={() => handleRemoveFromCart(item.product_id)}>Remove</button>
									</div>
								</li>
							))
						) : (
							<li>No items in cart</li>
						)}
					</ul>
				)}
			</div>
		</>
	);
};

export default Cart;
