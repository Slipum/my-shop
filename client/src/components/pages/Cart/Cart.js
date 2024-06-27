import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../../../api';
import './index.css';

const Cart = () => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const fetchCart = async () => {
			const response = await getCart();
			setCartItems(response.data);
		};
		fetchCart();
	}, []);

	const handleRemoveFromCart = (id) => {
		removeFromCart(id);
		setCartItems(cartItems.filter((item) => item.id !== id));
	};

	return (
		<div>
			<h1>Your Cart</h1>
			<ul>
				{cartItems.map((item) => (
					<li key={item.id}>
						<h2>{item.product_name}</h2>
						<p>Quantity: {item.quantity}</p>
						<button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Cart;
