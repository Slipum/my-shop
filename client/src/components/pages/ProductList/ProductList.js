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
		<div>
			<h1>Products</h1>
			<ul>
				{products.map((product) => (
					<li key={product.id}>
						<img src={`http://localhost:3001/uploads/${product.image}`} alt={product.name} />
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
