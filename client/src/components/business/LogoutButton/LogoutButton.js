import React from 'react';
import { logout } from '../../../api';

const LogoutButton = () => {
	const handleLogout = async () => {
		try {
			await logout();
			window.location.href = '/login';
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};

	return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
