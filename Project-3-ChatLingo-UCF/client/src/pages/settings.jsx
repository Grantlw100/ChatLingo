import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import defaultProfilePic from '../assets/maxresdefault.jpg';

const Settings = () => {
    const navigate = useNavigate();
    const { data: meData, loading: queryLoading, error: queryError } = useQuery(QUERY_ME);
    const userData = meData?.me;
    const [updateUser, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_USER);
    const [errors, setErrors] = useState({});
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        colorTheme: 'light',
        languageCode: 'en',
    });

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/login');
        } else if (meData) {
            // Pre-fill the form with the current user data
            const { username, email, firstName, lastName } = meData.me;
            setFormState(prevState => ({
                ...prevState,
                username,
                email,
                firstName,
                lastName,
                // Add any other fields you want to pre-fill
            }));
        }
    }, [meData, navigate]);

    if (queryLoading) return <div>Loading...</div>;
    if (queryError) return <div>Error! {queryError.message}</div>;

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        setErrors({});

        if (formState.password !== formState.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match!' });
            return;
        }

        try {
            const { data } = await updateUser({
                variables: { ...formState },
            });
            Auth.login(data.updateUser.token);
            navigate('/profile');
        } catch (e) {
            console.error('Error updating settings:', e);
        }
    };

    return (
        <div>
            <h1>Settings</h1>
            <p>Change your settings here!</p>
            <section>
                <h2>Profile Settings</h2>
                <p>Change your profile settings here!</p>
                <img src={defaultProfilePic} alt='Profile' className='profile-pic' />
                <form onSubmit={handleFormSubmit}>
                <label htmlFor='firstName'>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder={userData?.firstName}
                    />
                    <label htmlFor='lastName'>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder={userData?.lastName}
                    />
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={userData?.username}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={userData?.email}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                    />
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                    />
                    <label htmlFor="profile-picture">You can set a profile picture now or Baby Hippo</label>
                    <input 
                        type="file"
                        name="profile-picture"
                        id="profile-picture"
                    />
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="phone"
                        name="phone"
                        id="phone"
                        placeholder={userData?.phone}
                    />
                    <label htmlFor="Desired Language">Choose your Primary Language:</label>
                    <select
                        name="language"
                        id="language"
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                        <option value="pt">Portuguese</option>
                        <option value="ru">Russian</option>
                        <option value="zh">Chinese</option>
                    </select>
                    <label htmlFor="theme">Choose your Theme:</label>
                    <select
                        name="theme"
                        id="theme"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
                {/* Display error message for confirmPassword if exists */}
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </section>
        </div>
    );
};

export default Settings;
