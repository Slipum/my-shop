import React, { useEffect, useState } from 'react';
import { addToCart, getProducts } from '../api';

const ProductList = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await getProducts();
			setProducts(response.data);
		};
		fetchProducts();
	}, []);

	const handleAddToCart = (product) => {
		addToCart(product.id);
		alert('Product added to cart');
	};

	return (
		<div>
			<h1>Products</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<h2>{product.name}</h2>
						<p>{product.description}</p>
						<p>${product.price}</p>
						<button onClick={() => handleAddToCart(product)}>Add to Cart</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductList;
