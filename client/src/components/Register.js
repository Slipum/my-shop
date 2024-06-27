import React, { useState } from 'react';
import { register } from '../api';

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await register(username, email, password);
			alert('User registered');
		} catch (err) {
			alert('Error registering user');
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				</label>
				<br />
				<label>
					Email:
					<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<br />
				<label>
					Password:
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</label>
				<br />
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
