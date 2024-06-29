import React from 'react';
import Header from '../../business/Header/Header';
import ProductList from '../ProductList/ProductList';
import './Home.css';

const Home = () => {
	return (
		<div>
			<Header />
			<h1 className="tag">Welcome to the Online Shop!</h1>
			<ProductList />
		</div>
	);
};

export default Home;
