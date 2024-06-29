import React from 'react';
import Header from '../../business/Header/Header';
import './NotFound.css';

const NotFound = () => {
	return (
		<>
			<Header />
			<div className="notf-container">
				<div className="notf-content">
					<h1>404 - Page Not Found</h1>
					<p>The page you are looking for does not exist.</p>
				</div>
			</div>
		</>
	);
};

export default NotFound;
