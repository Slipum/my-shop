import React, { useEffect, useState } from 'react';
import { getCart } from '../../../api';
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

	return (
		<div className="cart-container">
			<h2>Shopping Cart</h2>
			{error ? (
				<div className="error">{error}</div>
			) : (
				<ul>
					{Array.isArray(cartItems) && cartItems.length > 0 ? (
						cartItems.map((item) => (
							<li key={item.id}>
								<img src={`http://localhost:3001/uploads/${item.image}`} alt={item.product_name} />
								<div>
									<h3>{item.product_name}</h3>
									<p>{item.description}</p>
									<p>Price: ${item.price.toFixed(2)}</p>
									<p>Quantity: {item.quantity}</p>
								</div>
							</li>
						))
					) : (
						<li>No items in cart</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default Cart;
