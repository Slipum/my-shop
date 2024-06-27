import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Admin from './components/Admin'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
};

export default App;
