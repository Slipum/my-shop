import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { login, register } from '../../../api';
import './Register.css';

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [registrationMessage, setRegistrationMessage] = useState('');
	const [registrationMessageClass, setRegistrationMessageClass] = useState('');
	const [redirect, setRedirect] = useState(false);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const validateEmail = (email) => {
		return emailRegex.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			setRegistrationMessage('Invalid email format');
			setRegistrationMessageClass('error');
			return;
		}
		try {
			await register(username, email, password);
			setRegistrationMessage('User registered');
			setRegistrationMessageClass('success');
			await login(username, password);
			setRedirect(true);
		} catch (err) {
			setRegistrationMessage('Error registering user');
			setRegistrationMessageClass('error');
		}
	};

	return (
		<div className="auntification">
			{redirect ? (
				<Navigate to="/" />
			) : (
				<>
					<div className="icon-container">
						<a href="/">
							<i className="fa-solid fa-right-from-bracket"></i>
						</a>
					</div>
					<div className="reg-container">
						<form onSubmit={handleSubmit} id="mainForm">
							<h2>Sing up</h2>
							<div className="form-controll">
								<label htmlFor="name">Username</label>
								<input
									type="text"
									value={username}
									placeholder="Enter your username"
									onChange={(e) => setUsername(e.target.value)}
									autoComplete="off"
								/>
							</div>
							<div className="form-controll">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									value={email}
									placeholder="Enter your email"
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="off"
								/>
							</div>
							<div className="form-controll">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									value={password}
									placeholder="Enter your password"
									onChange={(e) => setPassword(e.target.value)}
									autoComplete="off"
								/>
							</div>
							<button type="submit">Sing up</button>
							{registrationMessage && (
								<span className={`registration-message ${registrationMessageClass}`}>
									{registrationMessage}
								</span>
							)}
						</form>
					</div>
				</>
			)}
		</div>
	);
};

export default Register;
