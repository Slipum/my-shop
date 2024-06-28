import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../../api';
import './Header.css';

const Header = () => {
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await getUserProfile();
				setProfile(response.data);
			} catch (error) {
				console.error('Error fetching profile:', error);
			}
		};

		fetchProfile();
	}, []);

	return (
		<header className="header-container">
			<div className="h-logo">
				<h1>My-Shop</h1>
			</div>
			<nav className="h-nav">
				<ul>
					<li>
						<a href="/">Home</a>
					</li>
					<li>
						<a href="/products">Products</a>
					</li>
				</ul>
			</nav>
			<div className="h-auth">
				{profile.username ? (
					<>
						<a href="/cart">Cart</a>
						<a className="goto" href="/profile">
							Profile: {profile.username}
						</a>
					</>
				) : (
					<>
						<a className="h-login" href="/login">
							Login
						</a>
						<a className="h-register" href="/register">
							Register
						</a>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
