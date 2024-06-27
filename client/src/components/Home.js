import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Online Shop!</h1>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
    );
};

export default Home;
