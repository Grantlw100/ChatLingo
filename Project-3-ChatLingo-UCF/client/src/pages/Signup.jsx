import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth.js';
import { ADD_USER } from '../utils/mutations.js';

function Signup(props) {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    colorTheme: 'light', // Assuming 'light' as a default value
    languageCode: 'en', // Assuming this will be set by the user; otherwise, set a default
  });
  
  const [addUser, { loading, error }] = useMutation(ADD_USER);
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setErrors({});
    try {
      const mutationResponse = await addUser({
        variables: { ...formState },
      });
      console.log(mutationResponse);
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
      console.log('Successfully signed up!');
    } catch (e) {
      console.error('Error signing up:', e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const verifyPassword = () => {
    if (formState.password === formState.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  if (loading) return <p>Loading...</p>; // Loading state handling
  if (error) return <p>An error occurred during signup: {error.message}</p>; // Error state handling


  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="username">Username:</label>
          <input
            placeholder="username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
            />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <p>Passwword must contain at least one letter, one number and must be 8 characters long.</p>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="confirmPwd">Confirm Password:</label>
          <input
            placeholder="******"
            name="confirmPassword"
            type="password"
            id="confirmPwd"
            onChange={handleChange}
          />
          {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
        </div>
        <div className="flex-row space-between my-2">
            <label htmlFor="languageCode">Choose your Primary Language:</label>
            <select
                name="languageCode"
                id="languageCode"
                onChange={handleChange}
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
        </div>
        <div className="flex-row space-between my-2">
            <label htmlFor="color-theme">Choose your Color Theme:</label>
            <select
                name="colorTheme"
                id="color-theme"
                onChange={handleChange}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </div>
        <div className="flex-row space-between my-2">
            <label htmlFor="profile-picture">You can set a profile picture now or latter in profile settings</label>
            <input 
                type="file"
                id="profile-picture"
                name="profile-picture"
                accept="image/png, image/jpeg"
            />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
