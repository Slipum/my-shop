import React, { useState } from 'react';
import { login } from '../../../api';
import './Login.css';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loginMessage, setLoginMessage] = useState('');
	const [loginMessageClass, setLoginMessageClass] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(username, password);
			setLoginMessage('Login successful');
			setLoginMessageClass('success');
		} catch (err) {
			setLoginMessage('Error logging in');
			setLoginMessageClass('error');
		}
	};

	return (
		<div className="auntification">
			<div className="login-container">
				<div className="icon-container">
					<a href="/">
						<i className="fa-solid fa-right-from-bracket"></i>
					</a>
				</div>
				<form onSubmit={handleSubmit}>
					<h2>Sing in</h2>
					<div className="form-control">
						<label htmlFor="name">Username</label>
						<input
							type="name"
							value={username}
							placeholder="Enter your username"
							onChange={(e) => setUsername(e.target.value)}
							autoComplete="off"
						/>
					</div>
					<div className="form-control">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							value={password}
							placeholder="Enter your password"
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="off"
						/>
					</div>
					<button type="submit">Sing in</button>
					{loginMessage && (
						<span className={`login-message ${loginMessageClass}`}>{loginMessage}</span>
					)}
				</form>
			</div>
		</div>
	);
};

export default Login;
