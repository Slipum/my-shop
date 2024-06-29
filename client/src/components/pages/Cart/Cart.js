import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../../../api';
import Header from '../../business/Header/Header';
import './Cart.css';

const Cart = () => {
	const [cartItems, setCartItems] = useState([]);
	const [error, setError] = useState(null);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await getCart();
				setCartItems(response.data);

				// Вычисляем итоговую стоимость
				calculateTotalPrice(response.data);
			} catch (error) {
				console.error('Error fetching cart items:', error);
				setError(`Failed to load cart items: ${error.message}`);
			}
		};

		fetchCartItems();
	}, []);

	const calculateTotalPrice = (items) => {
		let total = 0;
		items.forEach((item) => {
			total += item.price * item.quantity;
		});
		setTotalPrice(total);
	};

	const handleRemoveFromCart = async (productId) => {
		try {
			await removeFromCart(productId);
			// Обновляем состояние корзины после удаления
			const response = await getCart();
			setCartItems(response.data);

			// Пересчитываем итоговую стоимость после изменений в корзине
			calculateTotalPrice(response.data);
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
					<div>
						<ul className="cart-items">
							{Array.isArray(cartItems) && cartItems.length > 0 ? (
								cartItems.map((item) => (
									<div className="cart-item" key={item.id}>
										<div className="content-item">
											<img
												src={`http://localhost:3001/uploads/${item.image}`}
												alt={item.product_name}
												className="cart-item-image"
											/>
											<div className="cart-item-info">
												<h3>{item.product_name}</h3>
												<p className="cart-descript">{item.description}</p>
											</div>
										</div>
										<div className="price">
											<p>Price: ${item.price.toFixed(2)}</p>
											<p>Quantity: {item.quantity}</p>
										</div>
										<button onClick={() => handleRemoveFromCart(item.product_id)}>
											Remove <i className="fa-solid fa-xmark"></i>
										</button>
									</div>
								))
							) : (
								<li className="no-items">No items in cart</li>
							)}
						</ul>
					</div>
				)}
				<div className="total-price">
					<h3>Total Price: ${totalPrice.toFixed(2)}</h3>
				</div>
			</div>
		</>
	);
};

export default Cart;
