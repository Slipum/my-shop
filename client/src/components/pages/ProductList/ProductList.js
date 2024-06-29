import React, { useEffect, useState } from 'react';
import { addToCart, getProducts } from '../../../api';
import './ProductList.css';

const ProductList = () => {
	const [products, setProducts] = useState([]);

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
			alert('Product added to cart');
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
							<button onClick={() => handleAddToCart(product)} className="add-to-cart-button">
								Add to Cart
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductList;
