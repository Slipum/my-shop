import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './components/pages/Admin/Admin';
import Cart from './components/pages/Cart/Cart';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import ProductList from './components/pages/ProductList/ProductList';
import Profile from './components/pages/Profile/Profile';
import Register from './components/pages/Register/Register';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/products" element={<ProductList />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</Router>
	);
};

export default App;
