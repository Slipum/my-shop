import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { getUserProfile } from './api';
import About from './components/pages/About/About';
import Admin from './components/pages/Admin/Admin';
import Cart from './components/pages/Cart/Cart';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import NotFound from './components/pages/NotFound/NotFound';
import Profile from './components/pages/Profile/Profile';
import Register from './components/pages/Register/Register';

const App = () => {
	const [userProfile, setUserProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const response = await getUserProfile();
				setUserProfile(response.data);
			} catch (error) {
				console.error('Error fetching profile:', error);
				setUserProfile(null); // Установить профиль в null при ошибке
			} finally {
				setLoading(false); // Установить loading в false после завершения загрузки
			}
		};

		fetchUserProfile();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={userProfile ? <Navigate to="/" /> : <Login />} />
				<Route path="/register" element={userProfile ? <Navigate to="/" /> : <Register />} />
				<Route path="/about" element={<About />} />
				{userProfile && ( // Проверяем, что userProfile загружен
					<>
						<Route
							path="/admin"
							element={userProfile.username === 'admin' ? <Admin /> : <NotFound />}
						/>
						<Route path="/cart" element={<Cart />} />
						<Route path="/profile" element={<Profile />} />
					</>
				)}
				{!userProfile && ( // Если userProfile не загружен, перенаправляем на страницу логина
					<Route path="/*" element={<Navigate to="/login" />} />
				)}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
