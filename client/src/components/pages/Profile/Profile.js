import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../../api';
import LogoutButton from '../../business/LogoutButton/LogoutButton';
import './Profile.css';

const Profile = () => {
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
		<div className="auntification">
			<div className="profile-container">
				<div className="icon-container">
					<a href="/">
						<i className="fa-solid fa-right-from-bracket"></i>
					</a>
				</div>
				<h2>Profile</h2>
				<div className="profile-details">
					<p>
						<strong>Username:</strong> {profile.username}
					</p>
					<p>
						<strong>Email:</strong> {profile.email}
					</p>
					<LogoutButton />
				</div>
			</div>
		</div>
	);
};

export default Profile;
