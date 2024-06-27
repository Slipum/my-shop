import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../api';
import './index.css';

const Admin = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await getUsers();
				setUsers(response.data);
			} catch (err) {
				alert('Error fetching users');
			}
		};
		fetchUsers();
	}, []);

	return (
		<div>
			<h1>Admin Panel</h1>
			<h2>Registered Users</h2>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.username}</li>
				))}
			</ul>
		</div>
	);
};

export default Admin;
