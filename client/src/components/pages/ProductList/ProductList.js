import React, { useEffect, useState } from 'react';
import { addToCart, getCart, getProducts } from '../../../api';
import './ProductList.css';

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await getCart();
				setCartItems(response.data);
			} catch (error) {
				console.error('Error fetching cart items:', error);
			}
		};
		fetchCartItems();
	}, []);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await getProducts();
			setProducts(response.data);
		};
		fetchProducts();
	}, []);

	const handleAddToCart = async (product) => {
		try {
			const response = await addToCart(product.id);
			console.log('Response from server:', response);
			const updatedCart = await getCart();
			setCartItems(updatedCart.data);
		} catch (error) {
			console.error('Error adding product to cart:', error);
		}
	};

	return (
		<div className="products-container">
			<ul className="products-list">
				{products.map((product) => (
					<li className="product-item" key={product.id}>
						<div className="image-wrapper">
							<img
								src={`http://localhost:3001/uploads/${product.image}`}
								alt={product.name}
								className="product-image"
							/>
						</div>
						<div className="product-ginfo">
							<h2 className="product-name">{product.name}</h2>
							<p className="product-description">{product.description}</p>
							<p className="product-price">${product.price}</p>
							<div className="response">
								{cartItems.map((item) =>
									item.product_name !== product.name ? (
										<></>
									) : (
										<div key={item.id} className="quantity">
											<p>{item.quantity} pcs.</p>
										</div>
									),
								)}
								<button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
									<i class="fa-solid fa-plus"></i> Add to Cart
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductList;
